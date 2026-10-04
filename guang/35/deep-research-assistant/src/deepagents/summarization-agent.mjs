import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
// 从 URL 转换为文件路径 
import { fileURLToPath } from "node:url";
import { ChatOpenAI } from "@langchain/openai";
import { createAgent, HumanMessage } from "langchain";
// 对话摘要中间件， 防止超出 LLM 上下文窗口， 
import { 
  createSummarizationMiddleware, 
  // `FilesystemBackend` 是**本地文件存储后端**，给 Agent 提供读写本机磁盘的能力
  FilesystemBackend 
} from "deepagents";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.join(__dirname, "workspace-summarization");
const historyPathPrefix = "/conversation_history";

const summaryPrompt = `你是对话摘要助手。请用中文总结以下对话，包含：
1. 讨论的主要话题
2. 达成的关键结论或决定
3. 继续对话所需的重要上下文

保持简洁，不要罗列无关细节。

待摘要的对话：
{conversation}

摘要：`;

fs.rmSync(workspaceDir, { recursive: true, force: true });
fs.mkdirSync(workspaceDir, { recursive: true });

const model = new ChatOpenAI({
  model: 'qwen-plus',
  apiKey: process.env.OPENAI_API_KEY,
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  temperature: 0,
});

const backend = new FilesystemBackend({
  rootDir: workspaceDir,
  virtualMode: true,
});

const agent = createAgent({
  model,
  tools: [],
  systemPrompt:
    "你是会话助手。记住用户提到的关键事实，中文简短回答。若看到「此前对话摘要」，请据此继续对话。",
  middleware: [
    // createSummarizationMiddleware 到达消息阈值就调用 model 做对话摘要，通过 backend 存到指定路径，
    // 保留最近几条消息，压缩上下文避免超出 LLM 窗口。
    createSummarizationMiddleware({
      model,
      backend,
      historyPathPrefix, // 对话摘要文件路径前缀
      summaryPrompt, // 对话摘要提示
      // 低阈值便于 demo 触发摘要；生产环境可省略 trigger/keep，由模型 profile 自动推断
      trigger: { type: "messages", value: 8 },
      keep: { type: "messages", value: 4 },
    }),
  ],
});

const prompts = [
  "请记住：我的宠物猫叫小橘。",
  "请记住：我住在北京。",
  "请记住：我喜欢喝拿铁。",
  "请记住：我的生日是 5 月 1 日。",
  "根据我们聊过的内容，我的猫叫什么、住哪、喜欢喝什么、生日是哪天？每项一行。",
];

const historyDir = path.join(workspaceDir, historyPathPrefix.replace(/^\//, ""));

function listHistoryFiles() {
  if (!fs.existsSync(historyDir)) return [];
  return fs.readdirSync(historyDir);
}

let messages = [];
let knownHistory = new Set(listHistoryFiles());

for (const prompt of prompts) {
  console.log("\n用户:", prompt);
  ({ messages } = await agent.invoke(
    { messages: [...messages, new HumanMessage(prompt)] },
    { recursionLimit: 30 }
  ));

  console.log("回复:", messages.at(-1)?.content);
  console.log("当前消息数:", messages.length);

  const historyFiles = listHistoryFiles();
  for (const file of historyFiles) {
    if (!knownHistory.has(file)) {
      knownHistory.add(file);
      console.log("已触发摘要，历史已写入:", `${historyPathPrefix}/${file}`);
    }
  }
}

if (knownHistory.size > 0) {
  for (const file of knownHistory) {
    const filePath = path.join(historyDir, file);
    console.log(`\n--- ${historyPathPrefix}/${file} ---\n`, fs.readFileSync(filePath, "utf8"));
  }
} else {
  console.log("\n未生成 conversation_history（可能未触发摘要阈值）");
}
