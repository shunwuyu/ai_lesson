/**
 * 基于 Redis 的 Agent 短期记忆 
 *
 * 模式：
 * - invoke 前：从 Redis 读取该会话的 messages
 * - invoke 后：把 agent 返回的 messages 写回 Redis（带 TTL）
 * - 压缩：由 langchain summarizationMiddleware 在 agent 内部完成
 *
 * 前置：docker compose up -d redis
 *
 * 运行：node src/agent-with-redis-memory.mjs
 * 输入 exit / quit / :q 退出；:clear 清空当前会话记忆
 */
import "dotenv/config";
import Redis from "ioredis"; // 引入 ioredis 模块，用于连接 Redis
import * as readline from "node:readline/promises"; // 引入 readline 模块，用于读取用户输入
import { stdin , stdout } from "node:process"; // 引入 process 模块，用于读取标准输入和标准输出
import { ChatOpenAI } from "@langchain/openai";
import {
  // 把大模型正在用的消息对象，压扁成干净普通 JSON，专门用来存数据库 / 缓存。
  // 将 LangChain 消息实例转为纯 JSON 对象，去掉类方法  HumanMessage -> PlainObject
  mapChatMessagesToStoredMessages, // 把 agent 返回的 messages 转换为存储用的格式
  // 把数据库读出来的 JSON 消息，重新转成大模型能直接用的消息对象。 
  // 接收从数据库取出的纯 JSON 消息数组，把普通对象还原成 LangChain 的 `BaseMessage` 实例
  mapStoredMessagesToChatMessages, // 把存储用的 messages 转换为 agent 输入的格式
} from "@langchain/core/messages";
import { 
  createAgent, 
  HumanMessage, 
  // 总结中间件
  // 来自deepagents
  summarizationMiddleware 
} from "langchain";

const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT ?? 6380);
// Redis 自带 0~15 一共 16 个小仓库，db0 是**默认库**
const REDIS_DB = Number(process.env.REDIS_DB ?? 0); // 0 shu'ju
// 如果环境变量 `MEMORY_TTL_SECONDS` 没配置、是空的，就默认用 1800 秒，也就是 30 分钟。
const MEMORY_TTL = Number(process.env.MEMORY_TTL_SECONDS ?? 1800);
const KEY_PREFIX = process.env.MEMORY_KEY_PREFIX ?? "agent:short_memory"; // 会话记忆的前缀
const SESSION_ID = process.env.MEMORY_SESSION_ID ?? "demo_user_001"; // 会话 ID

const summaryPrompt = `你是对话摘要助手。请用中文总结以下对话，包含：
1. 讨论的主要话题
2. 用户提到的重要事实（姓名、偏好、日期等，务必保留原文信息）
3. 继续对话所需的关键上下文

保持简洁，不要编造，不要遗漏用户明确说过的信息。

待摘要的对话：
{messages}

摘要：`;

class RedisMessageStore {
  constructor({ redis, keyPrefix, ttlSeconds }) {
    this.redis = redis;
    this.keyPrefix = keyPrefix;
    this.ttlSeconds = ttlSeconds;
  }

  messagesKey(sessionId) {
    return `${this.keyPrefix}:${sessionId}:messages`;
  }

  async loadMessages(sessionId) {
    const raw = await this.redis.get(this.messagesKey(sessionId));
    if (!raw) return [];
    return mapStoredMessagesToChatMessages(JSON.parse(raw));
  }

  async saveMessages(sessionId, messages) {
    const payload = JSON.stringify(mapChatMessagesToStoredMessages(messages));
    await this.redis.set(this.messagesKey(sessionId), payload, "EX", this.ttlSeconds);
  }

  async clear(sessionId) {
    await this.redis.del(this.messagesKey(sessionId));
  }
  // 获取会话ttl  
  // 还剩多少秒过期
  async ttl(sessionId) {
    return this.redis.ttl(this.messagesKey(sessionId));
  }
}

async function invokeWithMemory(agent, store, sessionId, userText) {
  const history = await store.loadMessages(sessionId);
  console.log(`  ↳ 从 Redis 加载 ${history.length} 条历史`);

  const result = await agent.invoke(
    { messages: [...history, new HumanMessage(userText)] },
    { recursionLimit: 30 },
  );

  await store.saveMessages(sessionId, result.messages);
  const ttl = await store.ttl(sessionId);
  console.log(`  ↳ 写回 Redis ${result.messages.length} 条 (TTL ${ttl}s)`);

  return result;
}

const redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT, db: REDIS_DB });

redis.on("connect", () => console.log("✅ Redis 已连接"));
redis.on("error", (err) => console.error("❌ Redis 错误:", err.message));

const store = new RedisMessageStore({
  redis,
  keyPrefix: KEY_PREFIX,
  ttlSeconds: MEMORY_TTL,
});

const model = new ChatOpenAI({
  model: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  temperature: 0,
});

const agent = createAgent({
  model,
  tools: [],
  systemPrompt:
    "你是会话助手。记住用户提到的关键事实，中文简短回答。若消息中有对话摘要，请据此继续对话。",
  middleware: [
    // 总结中间件
    // 来自deepagents
    summarizationMiddleware({
      model,
      summaryPrompt,
      trigger: { messages: 8 },
      keep: { messages: 4 },
    }),
  ],
});

console.log("输入 exit / quit / :q 退出，:clear 清空记忆\n");
const rl = readline.createInterface({ input: stdin, output: stdout }); // 创建 readline 接口，用于读取用户输入
let prevCount = (await store.loadMessages(SESSION_ID)).length; // 加载当前会话的历史消息数

try {   
  while (true) {
    const userText = (await rl.question("你: ")).trim();
    if (!userText) continue;

    if (["exit", "quit", ":q"].includes(userText.toLowerCase())) break;

    if (userText === ":clear") {
      await store.clear(SESSION_ID);
      prevCount = 0;
      console.log("已清空当前会话记忆\n");
      continue;
    }

    const { messages } = await invokeWithMemory(agent, store, SESSION_ID, userText);
    console.log("\n助手:", messages.at(-1)?.content);
    console.log(`当前消息数: ${messages.length}`);
    // 如果当前消息数小于上一次消息数 + 2，说明触发了压缩
    if (messages.length < prevCount + 2) {
      console.log("  ⚡ 已触发压缩");
    }
    prevCount = messages.length;
    console.log();
  }
} finally {
  rl.close();
}

await redis.quit();

// 我叫张三
// 我养了一只猫咪，他叫西西
//我在北京
// 今天天气不错
// 我叫什么
// 我们刚刚聊了什么