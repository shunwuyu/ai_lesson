import "dotenv/config";
// `Command` 是 LangGraph 用来**返回图执行指令**的类，可控制状态更新、跳转节点、终止流程。
import { Command } from "@langchain/langgraph";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import {
  createAgent,
  // LangChain 中间件像 agent 的拦截器，工具调用前后能拦截处理，
  // 可统计次数、改写消息，不用改 Agent 主逻辑，就能横向扩展能力。
  createMiddleware,
  HumanMessage,
  ToolMessage,
  tool
} from "langchain";

const getCurrentTime = tool(() => new Date().toISOString(), {
  name: "get_current_time",
  description: "返回当前 UTC 时间的 ISO 8601 字符串",
  schema: z.object({}),
});

/** 通过 middleware 注册工具，并用 wrapToolCall 包装执行 */
const extendedToolsMiddleware = createMiddleware({
  name: "ExtendedToolsMiddleware",
  stateSchema: z.object({
    toolInvocationCount: z.number().default(0),
  }),
  tools: [getCurrentTime],
  wrapToolCall: async (request, handler) => {
    // request 是一个 Command 对象，包含了当前请求的所有信息
    console.log(request);
    // handler 是一个函数，用于执行工具调用
    const toolName = request.tool?.name ?? request.toolCall.name;
    console.log(
      `[Tools] 即将执行: ${toolName}`,
      "args:",
      request.toolCall.args ?? {}
    );
    const result = await handler(request);
    if (!ToolMessage.isInstance(result)) return result;

    const wrapped = new ToolMessage({
      content: `${result.content}\n[wrapToolCall] 已由 ExtendedToolsMiddleware 包装`,
      tool_call_id: result.tool_call_id,
      name: result.name,
    });
    console.log(
      `[Tools] 执行完成: ${toolName}`,
      typeof wrapped.content === "string"
        ? wrapped.content.slice(0, 120)
        : wrapped
    );
    return new Command({
      update: {
        toolInvocationCount: request.state.toolInvocationCount + 1,
        messages: [wrapped],
      },
    });
  },
  afterAgent: (state) => {
    console.log(
      `[Tools] agent 结束，middleware 统计工具调用: ${state.toolInvocationCount} 次`
    );
  },
});

const model = new ChatOpenAI({
  model: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  temperature: 0,
});

const agent = createAgent({
  model,
  tools: [],
  systemPrompt:
    "你是一个助手。",
  middleware: [extendedToolsMiddleware],
});

for (const text of [
  "给我当前时间",
]) {
  console.log("\n用户:", text);
  const { messages, toolInvocationCount } = await agent.invoke({
    messages: [new HumanMessage(text)],
  });
  console.log("回复:", messages.at(-1)?.content);
  console.log("toolInvocationCount:", toolInvocationCount);
}
