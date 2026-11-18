import "./instrumentation.mjs";
// 导入 LangfuseCallbackHandler，用于在 LLM / tool 调用时自动上报 trace
import { CallbackHandler } from "@langfuse/langchain";
// 导入 DeepAgent，用于处理用户查询
import { 
  // 创建 DeepAgent 实例
  createAgent, 
  // 从 DeepAgent 的回复中提取文本内容
  extractReply 
} from "./agent.mjs";
// 导入 shutdownTracing 函数，用于关闭 OTel SDK，停止采集 span
import { shutdownTracing } from "./instrumentation.mjs";

const QUERY =
  "查一下 Shanghai 和 Tokyo 的天气，再用计算器把两地气温数字相加（31+28），最后总结。";

async function main() {
  const agent = createAgent();
  const langfuseHandler = new CallbackHandler({
    // 会话 ID，用于关联用户会话
    sessionId: "deepagents-demo",
    // 用户 ID，用于关联用户
    userId: "local-dev",
    tags: ["deepagents"],
  });

  console.log("running:", QUERY);

  // 关键：callbacks 挂上 Langfuse，LLM / tool 调用才会进 trace
  const result = await agent.invoke(
    { messages: [{ role: "user", content: QUERY }] },
    { callbacks: [langfuseHandler], recursionLimit: 30 },
  );

  console.log("\nreply:", extractReply(result));
  if (langfuseHandler.last_trace_id) {
    console.log("\ntrace id:", langfuseHandler.last_trace_id);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => shutdownTracing());
