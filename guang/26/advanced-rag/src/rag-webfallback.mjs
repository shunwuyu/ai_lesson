import "dotenv/config";
import { z } from "zod";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { Milvus } from "@langchain/community/vectorstores/milvus";

const llm = new ChatOpenAI({
  temperature: 0,
  model: "qwen-plus",
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  apiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-v3",
  dimensions: 1024,
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  apiKey: process.env.OPENAI_API_KEY,
});

const GraphState = Annotation.Root({
  question: Annotation,
  k: Annotation,
  strategy: Annotation,
  routeReason: Annotation,
  retrievedDocs: Annotation,
  localContext: Annotation,
  webContext: Annotation,
  evaluation: Annotation,
  generation: Annotation,
});

let vectorStore;

async function retrieveRelevantContent(query, k) {
  try {
    const docsWithScores = await vectorStore.similaritySearchWithScore(query, k);
    return docsWithScores.map(([doc, score]) => ({
      score,
      content: doc.pageContent,
      id: doc.metadata?.id ?? "unknown",
      book_id: doc.metadata?.book_id ?? "未知",
      chapter_num: doc.metadata?.chapter_num ?? "未知",
      index: doc.metadata?.index ?? "未知",
    }));
  } catch (error) {
    console.error("检索内容时出错:", error.message);
    return [];
  }
}

const RouteSchema = z.object({
  strategy: z.enum(["simple", "complex"]),
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
    retrievedDocs: [],
    localContext: "",
    webContext: "",
    evaluation: "",
    generation: "",
  };
};

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

const retrieveLocalNode = async (state) => {
  console.log("---LOCAL_RETRIEVE---");
  const retrievedDocs = await retrieveRelevantContent(state.question, state.k);
  console.log(`本地检索命中: ${retrievedDocs.length} 条`);
  const localContext = (retrievedDocs ?? []).map((d) => d.content).join("\n\n");
  return {
    retrievedDocs,
    localContext,
  };
};

const EvaluateSchema = z.object({
  enough: z.boolean(),
  missing: z.array(z.string()).max(6),
  reason: z.string(),
  web_query: z.string().optional(),
});

const evaluateNode = async (state) => {
  const hasWeb = Boolean(state.webContext && String(state.webContext).trim()); // 是否有联网搜索结果
  console.log(hasWeb ? "---EVALUATE_CONTEXT_WITH_WEB---" : "---EVALUATE_LOCAL_CONTEXT---");
  const evaluator = llm.withStructuredOutput(EvaluateSchema); // 评估器
  const out = await evaluator.invoke(`你是信息充分性评估器。判断当前上下文是否足以回答用户问题。

用户问题：${state.question}

已检索上下文（来自本地知识库）：
${state.localContext || "（空）"}

${hasWeb ? `联网搜索结果：\n${state.webContext || "（空）"}\n` : ""}

输出字段：
- enough: 是否足够回答（true/false）
- missing: 若不够，列出缺失信息点（最多 6 条）
- reason: 简短原因
${hasWeb ? "" : "- web_query: 若不够，给出一个适合联网搜索的中文查询句（完整句，不用代词；为空也可）"}
`);

  console.log(`${hasWeb ? "二次评估" : "评估"}: enough=${out.enough} (${out.reason})`);
  if (!out.enough && out.missing?.length) {
    out.missing.forEach((m, i) => console.log(`  缺失${i + 1}: ${m}`));
  }
  return {
    evaluation: JSON.stringify(out),
  };
};

/**
 * Call Bocha Web Search API
 */
async function bochaWebSearch(query, count) {
  const apiKey = process.env.BOCHA_API_KEY;
  if (!apiKey) {
    throw new Error("Bocha Web Search 的 API Key 未配置（环境变量 BOCHA_API_KEY）。");
  }
  const url = "https://api.bochaai.com/v1/web-search";
  const body = {
    query,
    freshness: "noLimit",
    summary: true,
    count: count ?? 10,
  };

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error(`搜索 API 请求失败（网络错误）：${error.message}`);
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`搜索 API 请求失败，状态码: ${response.status}, 错误信息: ${errorText}`);
  }

  let json;
  try {
    json = await response.json();
  } catch (error) {
    throw new Error(`搜索结果解析失败：${error.message}`);
  }

  if (json?.code !== 200 || !json?.data) {
    throw new Error(`搜索 API 返回失败：${json?.msg ?? "未知错误"}`);
  }

  const webpages = json.data.webPages?.value ?? [];
  if (!webpages.length) {
    return "未找到相关结果。";
  }

  return webpages
    .map(
      (page, idx) => `引用: ${idx + 1}
标题: ${page.name}
URL: ${page.url}
摘要: ${page.summary}
网站名称: ${page.siteName}
网站图标: ${page.siteIcon}
发布时间: ${page.dateLastCrawled}`,
    )
    .join("\n\n");
}

const webSearchNode = async (state) => {
  console.log("---WEB_SEARCH---");
  const parsed = (() => {
    try {
      return JSON.parse(state.evaluation || "{}");
    } catch {
      return {};
    }
  })();
  const query = (parsed.web_query ?? "").trim() || state.question;
  console.log(`联网查询: ${query}`);
  const webContext = await bochaWebSearch(query, 8);
  console.log(`联网结果长度: ${webContext.length}`);
  return { webContext };
};

const generateNode = async (state) => {
  console.log("---GENERATE---");
  const context = [state.localContext, state.webContext].filter(Boolean).join("\n\n===== 联网补充 =====\n\n");
  process.stdout.write("\n【AI 回答（流式）】\n");
  let generation = "";
  const stream = await llm.stream(`你是一个严谨的中文问答助手。优先依据上下文作答，不要编造。

上下文（本地知识库 + 可选联网补充）：
${context || "（空）"}

用户问题：${state.question}

回答要求：
1. 如果上下文足够，给出清晰、可核对的回答；需要时引用“引用: n / URL”或小说片段来支撑。
2. 如果上下文仍不足以确定关键事实，明确说明“不确定/无法从上下文确认”，并说明缺失点。
3. 不要输出表情符号。

回答：`);
  for await (const chunk of stream) {
    const text = typeof chunk.content === "string" ? chunk.content : "";
    if (!text) continue;
    generation += text;
    process.stdout.write(text);
  }
  process.stdout.write("\n");
  return { generation };
};

function afterRoute(state) {
  return state.strategy === "simple" ? "direct_answer" : "local_retrieve";
}

function afterEvaluateLocal(state) {
  if (state.webContext && String(state.webContext).trim()) {
    return "generate";
  }
  const parsed = (() => {
    try {
      return JSON.parse(state.evaluation || "{}");
    } catch {
      return {};
    }
  })();
  return parsed.enough === true ? "generate" : "web_search";
}

const graph = new StateGraph(GraphState)
  .addNode("route_question", routeQuestionNode)
  .addNode("direct_answer", directAnswerNode)
  .addNode("local_retrieve", retrieveLocalNode)
  .addNode("evaluate_local", evaluateNode)
  .addNode("web_search", webSearchNode)
  .addNode("generate", generateNode)
  .addEdge(START, "route_question")
  .addConditionalEdges("route_question", afterRoute, {
    direct_answer: "direct_answer",
    local_retrieve: "local_retrieve",
  })
  .addEdge("local_retrieve", "evaluate_local")
  .addConditionalEdges("evaluate_local", afterEvaluateLocal, {
    generate: "generate",
    web_search: "web_search",
  })
  .addEdge("web_search", "evaluate_local")
  .addEdge("direct_answer", END)
  .addEdge("generate", END)
  .compile();

async function main() {
  const question =
    "请回答《天龙八部》小说里“雁门关事件”的主谋是谁，并说明其儿子的最终结局；另外请补充：在《天龙八部》2013 版电视剧中，这段“雁门关事件”主要出现在哪几集？请给出可核对的来源链接。";
  const k = 8;

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
    if (!error.message.includes("already loaded")) throw error;
    console.log("✓ 集合 ebook_collection 已处于加载状态\n");
  }

  console.log("=".repeat(80));
  console.log(`问题: ${question}`);
  console.log("=".repeat(80));

  const result = await graph.invoke({
    question,
    k,
    strategy: "",
    routeReason: "",
    retrievedDocs: [],
    localContext: "",
    webContext: "",
    evaluation: "",
    generation: "",
  });

  console.log(`\n最终策略: ${result.strategy}`);
  if (!result.generation?.trim()) {
    console.log("模型未返回内容。");
  }
}

main()
