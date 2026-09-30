import "dotenv/config";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
// **把 ChatModel 返回的 `AIMessage` 对象，提取 `.content`，转为纯字符串；同时支持流式
//  `AIMessageChunk`，吐出文本片段
import { StringOutputParser } from "@langchain/core/output_parsers";
//  可以在 StateGraph 中直接使用 RunnableSequence 作为节点，而不需要手动包装。
// RunnableSequence 就是把多个可执行组件按顺序串起来，前一个输出传给后一个，
// 就是 | 管道运算符背后的底层类。
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Milvus } from "@langchain/community/vectorstores/milvus";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  model: process.env.EMBEDDING_MODEL ?? "text-embedding-v3",
});

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  model: process.env.MODEL_NAME ?? "qwen-plus",
  temperature: 0,
});

const vectorStore = await Milvus.fromExistingCollection(embeddings, {
  collectionName: process.env.MILVUS_COLLECTION ?? "rag_docs",
  url: process.env.MILVUS_URI ?? "http://localhost:19530",
});
// 把 Milvus 向量库包装成检索器，调用时自动做向量相似度查询，直接返回匹配文档。
const retriever = vectorStore.asRetriever({ k: 4 });

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "你是客服助手。仅根据下面「上下文」回答；上下文没有的信息请明确说不知道，不要编造。\n\n上下文：\n{context}",
  ],
  ["human", "{question}"],
]);
// 用 RunnableSequence.from 按顺序串联提示词、大模型、文本解析器，构成链式流程，依次执行流转输出。
// 执行顺序 前一个的输出，作为后一个的输入，按数组从左到右依次跑。
const chain = RunnableSequence.from([prompt, llm, new StringOutputParser()]);

const GraphState = Annotation.Root({
  question: Annotation,
  context: Annotation,
  answer: Annotation,
});

async function retrieve(state) {
  const docs = await retriever.invoke(state.question);
  return { context: docs };
}

async function generate(state) {
  const contextText = state.context.map((d) => d.pageContent).join("\n\n");
  const answer = await chain.invoke({
    context: contextText,
    question: state.question,
  });
  return { answer };
}

const workflow = new StateGraph(GraphState)
  .addNode("retrieve", retrieve)
  .addNode("generate", generate)
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", END);
// StateGraph 定义图节点与流转规则，compile 编译封装成可调用 Runnable，
// 得到能 invoke 执行的 RAG 应用实例。
export const ragApp = workflow.compile();

export async function ask(question) {
  const result = await ragApp.invoke({ question });
  return {
    answer: result.answer,
    context: result.context ?? [],
  };
}
