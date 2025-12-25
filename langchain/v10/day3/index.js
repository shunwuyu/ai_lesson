import { ChatDeepSeek } from '@langchain/deepseek';
import 'dotenv/config'
// 1️⃣ 创建模型
const model = new ChatDeepSeek({
  modelName: "deepseek-chat", // DeepSeek 官方模型名（必填）
  temperature: 0, // 工具调用建议低温度，保证准确性
});

const res = await model.invoke('我叫 Andrew');
console.log(res.content);
const res2 = await model.invoke('我叫什么名字？');
console.log(res2.content);
// // 2️⃣ 创建对话链（⚠️ 没有 memory）
// const chain = new ConversationChain({
//   llm: model,
// });

// 3️⃣ 第一次对话
const res1 = await chain.call({
  input: "我叫 Andrew",
});
console.log(res1.response);

// 4️⃣ 第二次对话
const res2 = await chain.call({
  input: "我叫什么名字？",
});
console.log(res2.response);
