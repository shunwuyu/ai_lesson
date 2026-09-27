import "dotenv/config";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import {
  createAgent, // 快速创建能自主思考、调用工具完成任务的智能体。
  // 中间件就像快递中转站：包裹（请求 / 状态）经过这里，可以检查、改内容、拦截，再交给下一站（Agent 逻辑）。
  createMiddleware, // 用来创建自定义中间件，拦截、修改 agent 执行流程与状态。
  HumanMessage,
  AIMessage,
} from "langchain";

const model = new ChatOpenAI({
  model: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  temperature: 0,
});
// 日志 + 模型调用次数统计中间件
const loggingMiddleware = createMiddleware({
  name: "LoggingMiddleware",
  stateSchema: z.object({
    modelCallCount: z.number().default(0),
  }),
  // 中间件在 agent 执行前调用，返回状态。
  beforeAgent: (state) => {
    // Agent 默认自带 messages 状态数组
    console.log("\n[Logging] agent 开始，消息数:", state.messages.length);
  },
  // 中间件在模型调用前调用，返回状态。
  beforeModel: (state) => {
    console.log(
      `[Logging] 即将调用模型，当前消息数: ${state.messages.length}，已调用: ${state.modelCallCount} 次`
    );
  },
  // 中间件在模型调用后调用，返回状态。
  afterModel: (state) => {
    // 模型返回的最后消息
    const last = state.messages.at(-1);
    // 多模态类型是对象
    const preview =
      typeof last?.content === "string"
        ? last.content.slice(0, 80)
        : JSON.stringify(last?.content)?.slice(0, 80);
    console.log(`[Logging] 模型返回: ${preview}...`);
    return { modelCallCount: state.modelCallCount + 1 };
  },
  afterAgent: (state) => {
    console.log(
      `[Logging] agent 结束，累计模型调用: ${state.modelCallCount} 次\n`
    );
  },
});

/** 在每次模型调用前追加 system 上下文 */
// `wrapModelCall`用于包装模型调用，拦截修改传给大模型的请求参数后再执行调用。
// 操作对象：**发给 LLM 的原始请求 request**
// 生命周期钩子操作 state 状态，wrapModelCall 专门拦截模型原始请求
const addContextMiddleware = createMiddleware({
  name: "AddContextMiddleware",
  // `request`是传给模型的原始请求对象，`handler`是执行实际模型调用的回调函数。
  wrapModelCall: async (request, handler) => {
    console.log("[AddContext] 注入额外 system 上下文");
    return handler({
      ...request,
      systemMessage: request.systemMessage.concat(
        "\n\n 请用一句话简洁回答。"
      ),
    });
  },
});

/** 拦截敏感词，直接结束 agent */
const blockedContentMiddleware = createMiddleware({
  name: "BlockedContentMiddleware",
  beforeModel: {
    canJumpTo: ["end"], // 可以跳转到langgraph 的end 节点 
    hook: (state) => {
      const last = state.messages.at(-1);
      const text =
        typeof last?.content === "string" ? last.content : String(last?.content ?? "");
      if (text.includes("BLOCKED")) {
        console.log("[Blocked] 检测到 BLOCKED，短路结束");
        return {
          messages: [new AIMessage("该请求已被 middleware 拦截，无法处理。")],
          jumpTo: "end",
        };
      }
    },
  },
});

const agent = createAgent({
  model,
  tools: [],
  systemPrompt: "你是一个助手。",
  middleware: [
    loggingMiddleware,
    addContextMiddleware,
    blockedContentMiddleware
  ]
})


for (const text of [
  "用中文说：middleware 是什么？",
  "这句话包含 BLOCKED 关键词",
]) {
  console.log("\n用户:", text);
  // LLM 接口请求次数
  const { messages, modelCallCount } = await agent.invoke({
    messages: [new HumanMessage(text)],
  });
  // `at(n)`按索引取元素，支持负数从末尾取，`at(-1)`取最后一项，可选链防报错。
  console.log("回复:", messages.at(-1)?.content);

  console.log("modelCallCount:", modelCallCount);
}