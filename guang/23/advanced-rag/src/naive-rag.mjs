import "dotenv/config";
import { 
  ChatOpenAI, 
  OpenAIEmbeddings 
} from '@langchain/openai';
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { Milvus } from "@langchain/community/vectorstores/milvus";

const client = new MilvusClient({
    address: process.env.MILVUS_ADDRESS,
    token: process.env.MILVUS_TOKEN
});

const COLLECTION_NAME="ebook2";
const TOP_K=5;
// 图 声明图中的状态字段及其类型
// 每个字段都先"占个位"，声明它是图状态的一格。
const GraphState = Annotation.Root({
  question: Annotation,// 用户提出的原始问题
  k: Annotation, // 检索条数
  documents: Annotation,// 从 Milvus 召回的相关文档集合
  generation: Annotation // 最终答案，LLM 基于 documents 生成的回答
});

const model = new ChatOpenAI({
  temperature:0,
  model: "qwen-plus",
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL
  },
  apiKey: process.env.OPENAI_API_KEY
});

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-v3",
  dimensions: 1024
});

let vectorStore

async function retrieveRelevantContent(question, k = TOP_K) {
  try {
    const docsWithScores = await vectorStore.similaritySearchWithScore(question, k);
    return docsWithScores.map(([doc, score]) => ({
      score,
      content: doc.pageContent,
      id: doc.metadata?.id ?? "unknown",
      book_id: doc.metadata?.book_id ?? "未知",
      chapter_num: doc.metadata?.chapter_num ?? "未知",
      index: doc.metadata?.index ?? "未知",
    }));
  } catch (error) {
    console.error("检索内容时出错：", error.message);
    return [];
  }
}




const retrieveNode = async (state) => {
  const documents = await retrieveRelevantContent(state.question, state.k);
  return {
    question: state.question,
    k: state.k,
    documents,
  };
};

const generateNode = async (state) => {
  const context = state.documents
    .map(
      (item, i) =>
        `[片段 ${i + 1}]
章节：第 ${item.chapter_num} 章
内容：${item.content}`,
    )
    .join("\n\n——\n\n");

  const prompt = `你是一个专业的《天龙八部》小说助手。基于小说内容回答问题，用准确、详细的语言。

请根据以下《天龙八部》小说片段内容回答问题：
${context}

用户问题：${state.question}
回答要求：
1. 如果片段中有相关信息，请结合小说内容给出详细、准确的回答
2. 可以综合多个片段的内容，提供完整的答案
3. 如果片段中没有相关信息，请如实告知用户
4. 回答要准确，符合小说的情节和人物设定
5. 可以引用原文内容来支持你的回答

AI 助手的回答：`;

process.stdout.write("\n【AI 回答（流式）】\n");
let generation = "";
const stream = await model.stream(prompt);
for await (const chunk of stream) {
  const text = typeof chunk.content === "string" ? chunk.content : "";
  if (!text) continue;
  generation += text;
  process.stdout.write(text);
}
process.stdout.write("\n");

return {
  question: state.question,
  k: state.k,
  documents: state.documents,
  generation,
};
};

const graph = new StateGraph(GraphState)
  .addNode("retrieve", retrieveNode)
  .addNode("generate", generateNode)
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", END)
  .compile();

async function main() {
  const question = "阿朱的结局是什么？";
  const kArg = 5;
  console.log('////////');
  console.log('Connecting to Milvus...');
  await client.connectPromise;
  console.log('✓ Connected\n');

  // 这句是把编译好的图 导出成绘图数据 （Mermaid 格式，
  // 可转成流程结构图），用来可视化整张 RAG 流程长什么样
  // ——节点、连线一目了然，方便调试和演示。
  const drawable = await graph.getGraphAsync();
  // Mermaid 中文一般就叫「美人鱼」，是 GitHub 
  // 上很火的 文本画图工具 ：用简单代码就能生成流程图、
  // 时序图、甘特图等，无需拖拽画。
  
  const mermaid = drawable.drawMermaid({
    withStyles: true
  });
  
  const vectorStore = await Milvus.fromExistingCollection(embeddings, {
  // 直接传入你自己创建好的MilvusClient实例，不再写url
    clientConfig: {
      address: process.env.MILVUS_ADDRESS,  // .env 里去掉 https://
      token: process.env.MILVUS_TOKEN,
    },
    collectionName: COLLECTION_NAME,
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
  console.log(vectorStore, '-----');
  

  // try {
  //   await vectorStore.client.loadCollection({ collection_name: COLLECTION_NAME});
  //   console.log(`集合 ${COLLECTION_NAME} 已加载\n`);
  // } catch(err) {
  //   if (!err.message.includes('already loaded')) {
  //     throw err;
  //   }
  //   console.log(`集合 ${COLLECTION_NAME} 已处于加载状态`);
  // }
}

main()