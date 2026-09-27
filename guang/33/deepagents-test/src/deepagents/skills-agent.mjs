import "dotenv/config";
import { existsSync, mkdirSync } from "node:fs";
import { ChatOpenAI } from "@langchain/openai";
import { createAgent, HumanMessage } from "langchain";
import {
  // 实现本地系统调用
  LocalShellBackend,
  // 提供文件系统操作工具
  createFilesystemMiddleware,
  // 提供技能调用工具
  createSkillsMiddleware,
} from "deepagents";
// 从当前脚本所在目录，拼接出本地 skills 库的绝对路径。
// .agents 是项目里存放 Agent 技能、配置的隐藏文件夹
const skills = "/.agents/skills/";
// 从当前脚本所在目录，拼接出本地 output 目录的绝对路径。
// 手绘风格绘图工具的原生文件格式，保存流程图 / 架构图数据。
const output = "src/deepagents/output/deepagents-skills-flow.excalidraw";
// **awesome-copilot 官方仓库里的 Copilot Skill**，**自然语言转 Excalidraw 手绘风图表**
if (!existsSync(".agents/skills/excalidraw-diagram-generator/SKILL.md")) {
  throw new Error(
    "未找到 excalidraw-diagram-generator，请先: npx skills add github/awesome-copilot --skill excalidraw-diagram-generator -y"
  );
}

mkdirSync("src/deepagents/output", { recursive: true });

const model = new ChatOpenAI({
  model: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  temperature: 0,
  streaming: true,
});
// 创建本地系统调用后端
const backend = await LocalShellBackend.create({
  rootDir: ".",
  // 开启虚拟模式，模拟文件系统
  // 用于在 Agent 运行时，模拟文件系统操作
  virtualMode: true,
  // 继承环境变量
  // 用于在 Agent 运行时，继承当前环境的环境变量
  inheritEnv: true,
});

const agent = createAgent({
  model,
  tools: [],
  systemPrompt: "按 skills 库完成任务，需要时 read_file 对应 SKILL.md。中文回答。",
  middleware: [
    // 提供技能调用工具
    // 用于在 Agent 运行时，调用 skills 库里的技能
    // 让中间件复用同一个文件后端，读取 sources 里技能对应的 SKILL.md 文件。
    createSkillsMiddleware({ backend, sources: [skills] }),
    // 提供文件系统操作工具
    // 用于在 Agent 运行时，操作文件系统
    createFilesystemMiddleware({ backend }),
  ],
});

const prompt = [
  "画一张流程图，描述本项目的 skills-agent 工作流：",
  "用户 Prompt → createAgent → createSkillsMiddleware → createFilesystemMiddleware → 模型回复。",
  `保存为 ${output}。要求：`,
  "- 顶部大标题 + 副标题",
  "- 每个主节点 numbered（①②…）且框内 2～3 行中文说明",
  "- 右侧一列「说明：…」补充细节",
  "- 箭头上标注阶段名（如 invoke、wrapModelCall）",
  "- 底部图例（颜色含义 + 如何运行 demo）",
].join("\n");

console.log("用户:", prompt);

function chunkText(chunk) {
  if (!chunk?.content) return "";
  if (typeof chunk.content === "string") return chunk.content;
  if (Array.isArray(chunk.content)) {
    return chunk.content
      .map((p) => (typeof p === "string" ? p : (p?.text ?? "")))
      .join("");
  }
  return "";
}

const stream = await agent.streamEvents(
  { messages: [new HumanMessage(prompt)] },
  // 递归调用限制
  // 用于防止无限递归调用
  { recursionLimit: 100 }
);
// 用于存储技能调用元数据
// 用于在 Agent 运行时，记录技能调用信息
let skillsMetadata;
console.log("\n--- 流式输出 ---\n");

try {
  for await (const event of stream) {
    if (event.event === "on_chat_model_stream") {
      const text = chunkText(event.data?.chunk);
      if (text) process.stdout.write(text);
    }
    if (event.event === "on_tool_start") {
      const name = event.name?.split("/").pop() ?? event.name;
      process.stdout.write(`\n\n→ ${name}\n\n`);
    }
    if (event.event === "on_chain_end" && event.data?.output?.skillsMetadata) {
      skillsMetadata = event.data.output.skillsMetadata;
    }
  }
} catch (e) {
  console.error("\n\n[错误]", e.cause?.message ?? e.message);
  throw e;
}

console.log("\n");
console.log("skills:", skillsMetadata?.map((s) => s.name));
if (existsSync(output)) {
  console.log("图表:", output);
  console.log("打开: https://excalidraw.com → Open → 选择该文件");
} else {
  console.log("未生成:", output);
}

await backend.close();
