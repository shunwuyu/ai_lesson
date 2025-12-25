import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";
import {
  InMemoryChatMessageHistory,
} from "@langchain/core/chat_history";
import 'dotenv/config'

// 1️⃣ 创建 DeepSeek 模型
const model = new ChatDeepSeek({
  model: "deepseek-chat",
  temperature: 0,

});

// 2️⃣ Prompt（显式包含 history）
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "你是一个有记忆的助手"],
  ["placeholder", "{history}"],
  ["human", "{input}"],
]);

// 3️⃣ 创建 Runnable（prompt → model）
// const runnable = prompt.pipe(model);
const runnable = prompt.pipe((input) => {
    console.log(">>> 最终传给模型的消息（Prompt 内容）:");
    console.log(input); // 这里 input 是已填充 {history, input} 的消息列表
    return input;
}).pipe(model);
// InMemoryChatMessageHistory 是 LangChain 提供的内存版聊天历史存储，
// 用于临时保存对话消息（如用户和 AI 的交互记录），适用于单会话、非持久化场景。
// 4️⃣ 创建内存（替代 ConversationBufferMemory）
const messageHistory = new InMemoryChatMessageHistory();

// 5️⃣ 带记忆的 Runnable
// 一个普通的可运行对象（runnable）包装成支持对话历史管理的链
const chain = new RunnableWithMessageHistory({
  runnable,
  getMessageHistory: async () => messageHistory,
  inputMessagesKey: "input",
  historyMessagesKey: "history",
});
// sessionId 共用同一份 Memory
// 6️⃣ 第一次对话
const res1 = await chain.invoke(
  { input: "我叫 Andrew" },
  { configurable: { sessionId: "demo" } }
);
console.log(res1.content);

// 7️⃣ 第二次对话（DeepSeek 能记住）
const res2 = await chain.invoke(
  { input: "我叫什么名字？" },
  { configurable: { sessionId: "demo" } }
);
console.log(res2.content);
