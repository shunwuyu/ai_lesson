import "dotenv/config";
// 用于在图执行中动态指定跳转节点、更新状态，实现灵活的流程分支控制。
import { Command } from "@langchain/langgraph";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import {
  createAgent,
  createMiddleware,
  HumanMessage,
  ToolMessage,
  tool, // 工具函数，用于创建可调用的函数。
} from "langchain";

const getCurrentTime = tool(() => new Date().toISOString(), {
  name: "get_current_time",
  // UTC 是世界协调时，不受时区影响的全球统一标准时间。
  description: "返回当前 UTC 时间的 ISO 8601 字符串",
  schema: z.object({}),
});

/** 通过 middleware 注册工具，并用 wrapToolCall 包装执行 */
const extendedToolsMiddleware = createMiddleware({
  name: "ExtendedToolsMiddleware",
  stateSchema: z.object({
    // 工具调用次数统计
    toolInvocationCount: z.number().default(0),
  }),
  tools: [getCurrentTime],
  // 工具调用前调用，返回状态。
  wrapToolCall: async (request, handler) => {
    // 尝试从工具定义对象拿工具名字
    // 大模型输出的**工具调用请求**
    const toolName = request.tool?.name ?? request.toolCall.name;
    console.log(
      `[Tools] 即将执行: ${toolName}`,
      "args:",
      request.toolCall.args ?? {}
    );
    // `request` 是本次工具调用的单据（工具、参数、状态）
    // `handler` 是真正干活、执行并返回结果的函数。
    const result = await handler(request);
    print(result);
    if (!ToolMessage.isInstance(result)) return result;
    // 包装工具调用结果，添加日志
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
    // update 返回状态指令对象 ， 告诉图要做什么修改
    // goto 
    // graph
    // resume 暂停， 修改
    return new Command({
      update: {
        toolInvocationCount: request.state.toolInvocationCount + 1,
        // 这是 增量补丁 ：`[wrapped]` 只是"要追加的新消息"，图会把它合并进已有列表，历史消息不丢。
        // messagesStateReducer ：数组默认「左 + 右」拼接
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
  // 中间件注册工具， 不用改 agent 主配置
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
