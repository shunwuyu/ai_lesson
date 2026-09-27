import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ChatOpenAI } from "@langchain/openai";
import { createAgent, HumanMessage } from "langchain";
import { 
  // 提供文件系统操作工具
  // `ls / read_file / write_file / edit_file / glob / grep`
  createFilesystemMiddleware,
  // 实现文件系统操作
  // 存储实现层，不是中间件
  FilesystemBackend  
} from "deepagents";

// 获取当前脚本所在目录，拼接出本地 workspace 工作目录的绝对路径。
const workspaceDir = path.join(
  // ES 模块元属性，返回当前模块文件 URL，常用于获取模块路径、解析本地文件。
  // 把`file://`格式 URL 转成本地文件系统路径
  // 接收文件路径，返回它**所在文件夹目录路径**，去掉文件名。
  path.dirname(fileURLToPath(import.meta.url)),
  "workspace"
);

/** 先匹配先生效；未命中任何规则则默认允许 */
const permissions = [
  // 禁止读取 /secret.txt
  { operations: ["read"], paths: ["/secret.txt"], mode: "deny" },
  // 允许写入 todo.md
  { operations: ["write"], paths: ["/todo.md"], mode: "allow" },
  // 禁止写入其他文件
  { operations: ["write"], paths: ["/**"], mode: "deny" },
];
// 初始化工作区
// 删除旧的工作区，创建新的工作区，写入机密文件
fs.rmSync(workspaceDir, { recursive: true, force: true });
// 创建新的工作区
fs.mkdirSync(workspaceDir);
// 写入机密文件
// 机密文件内容为：机密：不得读取
fs.writeFileSync(path.join(workspaceDir, "secret.txt"), "机密：不得读取", "utf8");

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
    "工作区根路径为 /。用 ls、read_file、write_file、edit_file 操作文件，路径以 / 开头。中文回答。",
  middleware: [
    createFilesystemMiddleware({
      // 专门处理 Agent 读写文件的底层干活对象
      backend: new FilesystemBackend({ rootDir: workspaceDir, virtualMode: true }),
      // 权限配置
      permissions,
    }),
  ],
});

console.log("工作区:", workspaceDir);
console.log("权限:", JSON.stringify(permissions, null, 2));

async function run(label, prompt) {
  console.log(`\n=== ${label} ===\n`, prompt, "\n");
  // 限制智能体**循环调用轮次**，防止 Agent 无限反复思考调用工具死循环，最多跑 20 轮。
  const { messages } = await agent.invoke(
    { messages: [new HumanMessage(prompt)] },
    { recursionLimit: 20 }
  );
  for (const m of messages) {
    for (const t of m.tool_calls ?? []) console.log("→", t.name);
  }
  console.log("回复:", messages.at(-1)?.content);
}

async function expectDenied(label, prompt) {
  console.log(`\n=== ${label}（预期拒绝）===\n`, prompt, "\n");
  try {
    await agent.invoke({ messages: [new HumanMessage(prompt)] }, { recursionLimit: 5 });
    console.log("未触发拒绝（异常）");
  } catch (e) {
    const msg = e.cause?.message ?? e.message;
    console.log("✗", msg);
  }
}

await run(
  "允许的操作",
  "write_file 创建 /todo.md（三条待办），edit_file 把第一条标为完成，ls /，一句话总结。"
);

await expectDenied("禁止读", "只调用 read_file，路径 /secret.txt。");
await expectDenied("禁止写", "只调用 write_file，路径 /hack.txt，内容 test。");
