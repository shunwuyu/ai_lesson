/**
 * Mem0 三种记忆 scope 的 API 测试
 *
 * add / search 分开调用，自行决定何时 search（add 为异步处理）
 *
 */
import "dotenv/config";
import { MemoryClient } from "mem0ai";
// 三个层级的记忆
const USER_ID = "mem0_test_user"; // 跟着人走的长期信息 姓名、城市、偏好、习惯
// 换会话、换Agent 也能读到
const RUN_ID = "mem0_test_session"; // 当前这次对话
const AGENT_ID = "mem0_test_agent"; // 这个助手是谁

function log(title, data) {
  console.log(`\n=== ${title} ===`);
  console.log(typeof data === "string" ? data : JSON.stringify(data, null, 2));
}

async function addUserMemory(client) {
  const messages = [
    { role: "user", content: "我叫小明，住在杭州，平时喜欢骑行和摄影。" },
    { role: "assistant", content: "好的，已记住你的姓名、城市和爱好。" },
  ];
  const added = await client.add(messages, { userId: USER_ID }); 
  // 只传 userId 就是用户记忆，属于该用户的全局长期记忆。
  log("用户记忆 — add", added);
}

async function searchUserMemory(client) {
  const searched = await client.search("用户住在哪里，有什么爱好", {
    filters: { user_id: USER_ID },
    topK: 5,
  });
  log("用户记忆 — search", searched.results?.map((m) => m.memory) ?? []);

  const listed = await client.getAll({ filters: { user_id: USER_ID }, pageSize: 5 });
  log("用户记忆 — getAll", listed.results?.map((m) => m.memory) ?? []);
}

async function addSessionMemory(client) {
  const messages = [
    { role: "user", content: "这次聊天先帮我把季度总结的大纲列出来，重点写 Q1 的项目复盘。" },
    { role: "assistant", content: "明白，我们先围绕 Q1 项目复盘整理季度总结大纲。" },
  ];
  const added = await client.add(messages, { userId: USER_ID, runId: RUN_ID });
  log("会话记忆 — add", added);
}

async function searchSessionMemory(client) {
  const searched = await client.search("这次对话要先做什么", {
    filters: { AND: [{ user_id: USER_ID }, { run_id: RUN_ID }] },
    topK: 5,
  });
  log("会话记忆 — search", searched.results?.map((m) => m.memory) ?? []);

  const listed = await client.getAll({
    filters: { AND: [{ user_id: USER_ID }, { run_id: RUN_ID }] },
    pageSize: 5,
  });
  log("会话记忆 — getAll", listed.results?.map((m) => m.memory) ?? []);
}

async function addAgentMemory(client) {
  const messages = [
    { role: "user", content: "你现在是旅行规划助手，回答时多给具体建议和备选方案。" },
    { role: "assistant", content: "好的，我会以旅行规划助手的身份，提供具体建议和备选方案。" },
  ];
  const added = await client.add(messages, { agentId: AGENT_ID });
  log("Agent 记忆 — add", added);
}

async function searchAgentMemory(client) {
  const searched = await client.search("这个 Agent 的角色和回答方式", {
    filters: { agent_id: AGENT_ID },
    topK: 5,
  });
  log("Agent 记忆 — search", searched.results?.map((m) => m.memory) ?? []);

  const listed = await client.getAll({ filters: { agent_id: AGENT_ID }, pageSize: 5 });
  log("Agent 记忆 — getAll", listed.results?.map((m) => m.memory) ?? []);
}

async function main() {
  if (!process.env.MEM0_API_KEY) {
    console.error("缺少 MEM0_API_KEY");
    process.exit(1);
  }

  const client = new MemoryClient({ 
    apiKey: process.env.MEM0_API_KEY
  });
  const action = process.argv[2] ?? "add";

  if (process.argv.includes("--cleanup")) {
    await client.deleteAll({ userId: USER_ID });
    await client.deleteAll({ userId: USER_ID, runId: RUN_ID });
    await client.deleteAll({ agentId: AGENT_ID });
    log("清理完成", { USER_ID, RUN_ID, AGENT_ID });
    return;
  }

  if (action === "add") {
    await addUserMemory(client);
    await addSessionMemory(client);
    await addAgentMemory(client);
    console.log("\nadd 已提交（异步处理），稍后再运行: pnpm scoped-memory search");
    return;
  }

  if (action === "search") {
    await searchUserMemory(client);
    await searchSessionMemory(client);
    await searchAgentMemory(client);
    return;
  }

  console.error(`未知命令: ${action}，可用: add | search | --cleanup`);
  process.exit(1);
}

main().catch((error) => {
  console.error("\n执行失败:", error.message ?? error);
  if (error.suggestion) console.error("建议:", error.suggestion);
  process.exit(1);
});
