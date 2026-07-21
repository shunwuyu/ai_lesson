import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
// 把模型输出解析成纯字符串
// 模型返回的是结构化对象， StringOutputParser 
// 只提取纯文本内容，方便后续链式调用或直接使用。
import { StringOutputParser } from "@langchain/core/output_parsers";
// 提示词模板 ，用于把用户输入拼接成带占位符的标准提示词再发给模型。
// 将 Prompt 编写从硬编码里抽离出来，
// 实现输入标准化、可复用、可链式编排，是 
// LangChain 核心抽象层的关键一环。
import { PromptTemplate } from "@langchain/core/prompts";

// 1. 初始化聊天大模型，核心配置 temperature + topK
const creativeModel = new ChatOpenAI({
  model: "deepseek-v4-pro",
  temperature: 0.8, // 高温度：增强创意发散
  topK: 4, // 仅从概率前4的词汇里采样，限制跑偏
  maxTokens: 600,
  apiKey: process.env.DEEPSEEK_API_KEY,
  configuration: {
    baseURL: "https://api.deepseek.com/v1",
  }
});

// 对比：严谨写实模型（低温度、更大topK保证信息完整）
const preciseModel = new ChatOpenAI({
  model: "deepseek-v4-pro",
  temperature: 0.2, // 低温保守，优先高概率标准答案
  topK: 8,
  maxTokens: 600,
  apiKey: process.env.DEEPSEEK_API_KEY,
  configuration: {
    baseURL: "https://api.deepseek.com/v1",
  }
});

// 输出解析器，统一返回纯文本
const outputParser = new StringOutputParser();

// 文字创作专用提示词模板
const storyPrompt = PromptTemplate.fromTemplate(`
请写一段短篇散文，主题：{theme}
风格温柔治愈，篇幅200字左右，不要分段，文笔细腻有画面感。
`);

// 构建链式调用
const creativeChain = storyPrompt.pipe(creativeModel).pipe(outputParser);
const preciseChain = storyPrompt.pipe(preciseModel).pipe(outputParser);

// 执行测试
async function runWriteDemo() {
  const theme = "秋日山野晚风";

  console.log("===== 创意创作模式 temperature=0.8 topK=4 =====");
  const creativeText = await creativeChain.invoke({ theme });
  console.log(creativeText, "\n");

  console.log("===== 严谨写实模式 temperature=0.2 topK=8 =====");
  const preciseText = await preciseChain.invoke({ theme });
  console.log(preciseText);
}

runWriteDemo().catch(console.error);