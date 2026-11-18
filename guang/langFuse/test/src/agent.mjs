// 导入 tool 函数，用于创建工具函数
import { tool } from "langchain";
// 导入 zod 库，用于定义工具函数的参数 schema
import { z } from "zod";
// 导入 createDeepAgent 函数，用于创建 DeepAgent 实例
import { createDeepAgent } from "deepagents";
import "dotenv/config";

const getWeather = tool(
  async ({ city }) => {
    const data = {
      shanghai: "31°C，闷热多云",
      tokyo: "28°C，晴",
      beijing: "33°C，晴热",
    };
    return data[city.trim().toLowerCase()] ?? `暂无 ${city} 的天气数据`;
  },
  {
    name: "get_weather",
    description: "查询城市天气（模拟数据）",
    schema: z.object({
      city: z.string().describe("城市英文名，如 Shanghai"),
    }),
  },
);
// 创建加法工具函数
const calculate = tool(
  async ({ a, b }) => String(a + b),
  {
    name: "calculate",
    description: "两个数相加",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  },
);

const modelConfig = {
  baseURL: process.env.OPENAI_BASE_URL,
  modelName: process.env.OPENAI_MODEL ?? "deepseek-v4-flash",
};

// 创建 DeepAgent 实例
export function createAgent() {
  return createDeepAgent({
    model: `openai:${modelConfig.modelName}`,
    tools: [getWeather, calculate],
    systemPrompt: "你是助手。查天气用 get_weather，加法用 calculate。用简体中文回答。",
  });
}

/** 从 agent 结果里取出最终回复文本 */
export function extractReply(result) {
  const last = result?.messages?.at(-1);
  if (typeof last?.content === "string") return last.content;
  // 处理数组类型的回复，如包含图片、视频等
  // 合并数组中的字符串部分，返回最终回复文本
  if (Array.isArray(last?.content)) {
    return last.content
      .map((part) => (typeof part === "string" ? part : part?.text ?? ""))
      .join("");
  }
  return String(last?.content ?? result ?? "");
}
