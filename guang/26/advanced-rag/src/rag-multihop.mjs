// 多步检索的复杂问题
import "dotenv/config";
import { z } from "zod";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { Milvus } from "@langchain/community/vectorstores/milvus";

const llm = new ChatOpenAI({
  temperature: 0,
  model: "qwen-plus",
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  apiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-v3",
  dimensions: 1024,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * complex：先拆解子问题序列，再按序检索
 */
const GraphState = Annotation.Root({
  question: Annotation,
  k: Annotation, // 每次检索的 top-k 数量
  strategy: Annotation, // 策略 simple/complex
  routeReason: Annotation, // 路由原因
  subQuestions: Annotation, // 拆解得到的有序子问题，仅用于检索
  /** 下一轮 retrieve 要用的下标（指向 subQuestions 中尚未检索的那一条） */
  nextSubIdx: Annotation,
  documents: Annotation, // 已检索到的文档
  currentQuery: Annotation, // 当前检索的子问题
  retrievalCount: Annotation,// 已检索次数
  maxRetrievals: Annotation, // 最大检索次数
  plannedNext: Annotation, // 计划下一步操作
  generation: Annotation, // 生成的最终答案
});

let vectorStore; // 向量数据库

async function retrieveRelevantContent(question, k) {
  try {
    // 从向量数据库中检索相关文档 score 从高到低排序
    // vectorStore.similaritySearchWithScore() 返回的 LangChain 
    // Document 对象，其 pageContent 是 Milvus 检索出的原文内容
    const docsWithScores = await vectorStore.similaritySearchWithScore(question, k);
    return docsWithScores.map(([doc, score]) => ({
      score,
      content: doc.pageContent,
      // doc.metadata.id 来自存入 Milvus 时每条数据里的字段
      id: doc.metadata?.id ?? "unknown", // 书元数据  文档 id
      book_id: doc.metadata?.book_id ?? "未知",
      chapter_num: doc.metadata?.chapter_num ?? "未知",
      index: doc.metadata?.index ?? "未知",
    }));
  } catch (error) {
    console.error("检索内容时出错:", error.message);
    return [];
  }
}

/** 按 id 合并；同 id 保留更高 score */
// 去重并按 score 排序
function mergeUnique(existingDocs, newDocs) {
  const map = new Map(); // es6 Map 结构 
  for (const d of [...existingDocs, ...newDocs]) {
    const key = String(d.id);
    const prev = map.get(key);
    // 如果 map 中没有这个 id，或者当前文档的 score 高于 map 中的文档的 score，就更新 map 中的文档
    if (!prev || Number(d.score) > Number(prev.score)) {
      map.set(key, d);
    }
  }
  // 将 map 中的文档转换为数组并按 score 排序 由高到低排序
  return Array.from(map.values()).sort((a, b) => Number(b.score) - Number(a.score));
}

const RouteSchema = z.object({
  strategy: z.enum(["simple", "complex"]),
  reason: z.string(),
});

const NextStepSchema = z.object({
  nextAction: z.enum(["retrieve", "generate"]),
  reason: z.string(),
});

const routeQuestionNode = async (state) => {
  console.log("---ROUTE_QUESTION---");
  const router = llm.withStructuredOutput(RouteSchema);
  const route = await router.invoke(`
你是问答路由器。请判断用户问题是否需要外部检索。

规则：
- simple: 常识问答、简短定义、无需特定小说细节即可回答。
- complex: 需要《天龙八部》具体情节、人物关系、章节事实、原文细节或证据支持。

用户问题：${state.question}
`);

  console.log(`路由策略: ${route.strategy} (${route.reason})`);
  return {
    strategy: route.strategy,
    routeReason: route.reason,
    retrievalCount: 0,
    maxRetrievals: state.maxRetrievals ?? 8,
    documents: [],
    subQuestions: [],
    nextSubIdx: 0,
    currentQuery: "",
  };
};

const DecomposeSchema = z.object({
  sub_questions: z.array(z.string()).min(1).max(8),
  reason: z.string(),
});

const decomposeQuestionNode = async (state) => {
  console.log("---DECOMPOSE_QUESTION---");
  const decomposer = llm.withStructuredOutput(DecomposeSchema);
  const out = await decomposer.invoke(`你是《天龙八部》多跳问答的「子问题拆解器」。

用户原始问题：
${state.question}

任务：将问题拆成**有序**子问题列表 sub_questions，用于**依次向量检索**。要求：
1. 链式推理、多层关系、因果先后的问题，必须拆成多条；单跳即可答的也可只输出 1 条。
2. 每条子问题必须是**可独立检索**的完整中文问句，**禁止**使用「他/她/此人/上文」等指代；可写全人物名与事件名。
3. 顺序必须符合推理链：先搞清前置实体/事实，再查后续结论。
4. **不要**把整句原题原样复制成唯一一条（除非确实无法拆分）；不要拆成过碎的关键词列表。
5. 输出 1～8 条即可。

请输出 sub_questions 与简短 reason。`);
    // 过滤掉数组中的假值元素
  const subQuestions = out.sub_questions.map((s) => s.trim()).filter(Boolean);
  
  // const sub_questions = ["苹果是什么", "", "   ", "香蕉的产地"];
  // // 先 trim 去掉首尾空格，再 filter(Boolean) 删掉空串
  // const result = sub_questions.map((s) => s.trim()).filter(Boolean);
  // console.log(result);
  
  if (subQuestions.length === 0) {
    throw new Error("decompose_question: sub_questions 为空");
  }

  console.log(`拆解 ${subQuestions.length} 条子问题 (${out.reason})`);
  subQuestions.forEach((q, i) => {
    console.log(`  [${i + 1}] ${q}`);
  });

  return {
    subQuestions,
    nextSubIdx: 0,
    currentQuery: subQuestions[0],
  };
};

const retrieveNode = async (state) => {
  const subs = state.subQuestions ?? [];
  const idx = state.nextSubIdx ?? 0;
  const q = subs[idx]?.trim(); // 去掉首尾空格  第 idx 条子问题
  if (!q) {
    throw new Error(`retrieve: 子问题下标 ${idx} 无有效文本（共 ${subs.length} 条）`);
  }

  const round = state.retrievalCount + 1; // 检索轮数
  console.log(`---RETRIEVE (第 ${round} 轮，子问题 ${idx + 1}/${subs.length})---`);
  console.log(`查询: ${q}`);

  const newDocs = await retrieveRelevantContent(q, state.k);
  const merged = mergeUnique(state.documents ?? [], newDocs);

  if (newDocs.length === 0) {
    console.log("本轮未命中文档");
  } else {
    console.log(`本轮命中 ${newDocs.length} 条，累计去重后 ${merged.length} 条`);
    newDocs.forEach((item, i) => {
      const preview =
        item.content.length > 120 ? `${item.content.substring(0, 120)}...` : item.content;
      console.log(
        `[R${i + 1}] score=${Number(item.score).toFixed(4)} chapter=${item.chapter_num} index=${item.index}`,
      );
      console.log(`      ${preview}`);
    });
  }

  return {
    documents: merged,
    retrievalCount: round,
    nextSubIdx: idx + 1,
    currentQuery: q,
  };
};

const planNextStepNode = async (state) => {
  console.log("---PLAN_NEXT_STEP---");
  const subs = state.subQuestions ?? [];
  const nextIdx = state.nextSubIdx ?? 0;
  const remaining = subs.length - nextIdx;

  const subList = subs.map((s, i) => `${i + 1}. ${s}${i < nextIdx ? " （已检索）" : i === nextIdx ? " （下一轮将检索，若选择继续）" : " （未检索）"}`).join("\n");

  const docStr =
    state.documents.length === 0
      ? "（尚无检索结果）"
      : state.documents
          .slice(0, 6)
          .map(
            (d, i) =>
              `[${i + 1}] score=${Number(d.score).toFixed(4)} 第${d.chapter_num}章: ${d.content.slice(0, 200)}${d.content.length > 200 ? "..." : ""}`,
          )
          .join("\n\n");

  const prompt = `你是多跳 RAG 规划器。检索查询已由前置步骤拆解为**有序子问题**；若需继续检索，下一轮将自动使用「下一条子问题」做向量检索，你**不要**自拟新的检索句。

用户原始问题：${state.question}

子问题序列：
${subList || "（无）"}

已检索轮数：${state.retrievalCount}；剩余未检索子问题条数：${remaining}
最大检索轮数上限：${state.maxRetrievals}

已召回文档摘要：
${docStr}

请判断下一步：
1) 已有足够依据回答用户原始问题 → nextAction=generate
2) 仍缺关键事实、且仍存在未检索的子问题、且未超过轮数上限 → nextAction=retrieve

硬性规则：
- 若剩余未检索子问题条数为 0，必须 nextAction=generate。
- 若已检索轮数已达到或超过最大检索轮数，必须 nextAction=generate。`;

  const model = llm.withStructuredOutput(NextStepSchema);
  const { nextAction, reason } = await model.invoke(prompt);

  let finalNext = nextAction;
  if (state.retrievalCount >= state.maxRetrievals) finalNext = "generate";
  if (remaining <= 0) finalNext = "generate";

  console.log(`[决策] plannedNext=${finalNext} (模型建议=${nextAction}) (${reason})`);

  return {
    plannedNext: finalNext,
  };
};

function afterRoute(state) {
  return state.strategy === "simple" ? "direct_answer" : "decompose_question";
}

function afterPlan(state) {
  return state.plannedNext === "retrieve" ? "retrieve" : "generate";
}

const directAnswerNode = async (state) => {
  console.log("---DIRECT_ANSWER---");
  process.stdout.write("\n【AI 回答（流式）】\n");
  let generation = "";
  const stream = await llm.stream(`你是一个中文问答助手，请直接简洁回答问题。

问题：${state.question}
`);
  for await (const chunk of stream) {
    const text = typeof chunk.content === "string" ? chunk.content : "";
    if (!text) continue;
    generation += text;
    process.stdout.write(text);
  }
  process.stdout.write("\n");
  return { generation };
};

const generateNode = async (state) => {
  console.log("---GENERATE---");
  const context = state.documents
    .map(
      (item, i) =>
        `[片段 ${i + 1}]
章节: 第 ${item.chapter_num} 章
内容: ${item.content}`,
    )
    .join("\n\n━━━━━\n\n");
  process.stdout.write("\n【AI 回答（流式）】\n");
  let generation = "";
  const stream = await llm.stream(`你是一个专业的《天龙八部》小说助手。基于小说内容回答问题，用准确、详细的语言。

请根据以下《天龙八部》小说片段内容回答问题：
${context || "（未检索到相关内容）"}

用户问题: ${state.question}

回答要求：
1. 如果片段中有相关信息，请结合小说内容给出详细、准确的回答
2. 可以综合多个片段的内容，提供完整的答案
3. 如果片段中没有相关信息，请如实告知用户
4. 回答要准确，符合小说的情节和人物设定
5. 可以引用原文内容来支持你的回答

AI 助手的回答:`);
  for await (const chunk of stream) {
    const text = typeof chunk.content === "string" ? chunk.content : "";
    if (!text) continue;
    generation += text;
    process.stdout.write(text);
  }
  process.stdout.write("\n");
  return { generation };
};

const graph = new StateGraph(GraphState)
  .addNode("route_question", routeQuestionNode)
  .addNode("direct_answer", directAnswerNode)
  .addNode("decompose_question", decomposeQuestionNode)
  .addNode("retrieve", retrieveNode)
  .addNode("plan_next_step", planNextStepNode)
  .addNode("generate", generateNode)
  .addEdge(START, "route_question")
  .addConditionalEdges("route_question", afterRoute, {
    direct_answer: "direct_answer",
    decompose_question: "decompose_question",
  })
  .addEdge("decompose_question", "retrieve")
  .addEdge("retrieve", "plan_next_step")
  .addConditionalEdges("plan_next_step", afterPlan, {
    retrieve: "retrieve",
    generate: "generate",
  })
  .addEdge("direct_answer", END)
  .addEdge("generate", END)
  .compile();

async function main() {
  const question =
    "《天龙八部》中「四大恶人」排行第二的是谁？此人之子在身世揭晓前，其生父在武林中的公开身份是什么？";
  const k = 5;

  const drawable = await graph.getGraphAsync();
  console.log(drawable.drawMermaid({ withStyles: true }));

  console.log("连接到 Milvus...");
  vectorStore = await Milvus.fromExistingCollection(embeddings, {
    collectionName: "ebook_collection",
    url: "localhost:19530",
    textField: "content",
    primaryField: "id",
    vectorField: "vector",
    indexCreateOptions: {
      metric_type: "COSINE",
      index_type: "HNSW",
      params: { M: 16, efConstruction: 200 },
      search_params: { ef: 64 },
    },
  });
  vectorStore.indexSearchParams = { metric_type: "COSINE", params: JSON.stringify({ ef: 64 }) };
  console.log("✓ 已连接\n");

  try {
    await vectorStore.client.loadCollection({ collection_name: "ebook_collection" });
    console.log("✓ 集合 ebook_collection 已加载\n");
  } catch (error) {
    if (!error.message.includes("already loaded")) {
      throw error;
    }
    console.log("✓ 集合 ebook_collection 已处于加载状态\n");
  }

  console.log("=".repeat(80));
  console.log(`问题: ${question}`);
  console.log("=".repeat(80));

  const result = await graph.invoke({
    question,
    k: Number.isFinite(k) ? k : 5,
    strategy: "",
    routeReason: "",
    subQuestions: [],
    nextSubIdx: 0,
    documents: [],
    currentQuery: "",
    retrievalCount: 0,
    maxRetrievals: 8,
    plannedNext: "",
    generation: "",
  });

  if (result.strategy === "complex") {
    if (result.subQuestions?.length) {
      console.log("\n【子问题序列】");
      result.subQuestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
    }
    console.log("\n【检索相关内容（累计）】");
    if (result.documents.length === 0) {
      console.log("未找到相关内容");
    } else {
      result.documents.forEach((item, i) => {
        console.log(`\n[片段 ${i + 1}] 相似度: ${Number(item.score).toFixed(4)}`);
        console.log(`书籍: ${item.book_id}`);
        console.log(`章节: 第 ${item.chapter_num} 章`);
        console.log(`片段索引: ${item.index}`);
        console.log(
          `内容: ${item.content.substring(0, 200)}${item.content.length > 200 ? "..." : ""}`,
        );
      });
    }
    console.log(`\n检索轮数: ${result.retrievalCount} / ${result.maxRetrievals}`);
  }

  console.log(`\n最终策略: ${result.strategy}`);
  if (!result.generation?.trim()) {
    console.log("模型未返回内容。");
  }
}

main().catch((err) => {
  console.error("运行失败:", err);
  process.exit(1);
});
