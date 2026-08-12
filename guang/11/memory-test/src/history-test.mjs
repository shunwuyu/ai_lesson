import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
// LangChain 的 内存对话历史存储 ，把多轮聊天消息存在进程内存里，用于实现带上下文的多轮对话
// 对话历史存储和读取抽象
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

console.log(process.env.MODEL_NAME,
  process.env.OPENAI_API_KEY,
   process.env.OPENAI_BASE_URL
)

const model = new ChatOpenAI({ 
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});
// 保存对话历史到内存里，
// 发新消息时把旧记录一起发给模型，让它记住上下文。
async function inMemoryDemo() {
    const history = new InMemoryChatMessageHistory();
    const systemMessage = new SystemMessage(
        "你是一个友好、幽默的做菜助手，喜欢分享美食和烹饪技巧。"
    );
    // 第一轮对话
    console.log("[第一轮对话]");
    const userMessage1 = new HumanMessage(
        "今天吃什么？"
    );
    await history.addMessage(userMessage1);
    const messages1 = [systemMessage, ...(await history.getMessages())];
    const response1 = await model.invoke(messages1);
    await history.addMessage(response1);

    console.log(`用户: ${userMessage1.content}`);
    console.log(`助手: ${response1.content}\n`);

    // 第二轮对话（基于历史记录）
    console.log("[第二轮对话 - 基于历史记录]");
    const userMessage2 = new HumanMessage(
            "好吃吗？"
          );
    await history.addMessage(userMessage2);
    const messages2 = [systemMessage, ...(await history.getMessages())];
    const response2 = await model.invoke(messages2);
    await history.addMessage(response2);
    console.log(`用户: ${userMessage2.content}`);
    console.log(`助手: ${response2.content}\n`);
    // 展示所有历史消息
  console.log("[历史消息记录]");
  const allMessages = await history.getMessages();
  console.log(`共保存了 ${allMessages.length} 条消息：`);
  allMessages.forEach((msg, index) => {
    const type = msg.type;
    const prefix = type === 'human' ? '用户' : '助手';
    console.log(`  ${index + 1}. [${prefix}]: ${msg.content.substring(0, 50)}...`);
  });
}

inMemoryDemo().catch(console.error);