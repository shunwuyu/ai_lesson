import "./instrumentation.mjs";

import { CallbackHandler } from "@langfuse/langchain";
import { createAgent, extractReply } from "./agent.mjs";
import { shutdownTracing } from "./instrumentation.mjs";

const QUERY =
  "查一下 Shanghai 和 Tokyo 的天气，再用计算器把两地气温数字相加（31+28），最后总结。";

async function main() {
  const agent = createAgent();
  const langfuseHandler = new CallbackHandler({
    sessionId: "deepagents-demo",
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
