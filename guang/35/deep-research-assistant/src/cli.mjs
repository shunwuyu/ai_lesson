import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { HumanMessage } from "@langchain/core/messages";

import { createIntelligenceDeskAgent, projectDir } from "./agent.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
loadEnv({ path: path.join(projectRoot, ".env") });
// 递归深度限制，防止无限循环。
const recursionLimit = Number(process.env.RECURSION_LIMIT) || 300;

const FILE_TOOLS = new Set([
  "write_file",
  "edit_file",
  "read_file",
  "ls",
  "glob",
  "grep",
]);

const EVAL_TOOL = "eval";
const PREVIEW_LEN = 100;
const RESULT_PREVIEW_LEN = 120;

function printBanner() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║              深度调研助手              ║");
  console.log("╚══════════════════════════════════════════╝\n");
}

async function readQuery() {
  const fromArgs = process.argv.slice(2).join(" ").trim();
  if (fromArgs) return fromArgs;

  const rl = readline.createInterface({ input, output });
  try {
    return (await rl.question("请输入调研主题: ")).trim();
  } finally {
    rl.close();
  }
}

function stepLabel(namespace, node) {
  if (namespace.length === 0) return `[主 Agent] ${node}`;
  const id = namespace[0]?.replace(/^tools:/, "subagent:") ?? namespace[0];
  return `[${id}] ${node}`;
}

function displayPath(p) {
  return p.startsWith("/workspace/") ? p.slice(1) : p.replace(/^\/+/, "");
}

function pathFromArgs(name, args) {
  if (!args || typeof args !== "object") return null;
  if (name === "write_file" || name === "edit_file" || name === "read_file") {
    return typeof args.file_path === "string" ? args.file_path : null;
  }
  if (name === "ls") return typeof args.path === "string" ? args.path : null;
  if (name === "glob" || name === "grep") {
    const dir = typeof args.path === "string" ? args.path : "/";
    const pattern = typeof args.pattern === "string" ? args.pattern : "";
    return pattern ? `${pattern} @ ${dir}` : dir;
  }
  return null;
}

function parseArgs(args) {
  if (typeof args === "string") {
    try {
      return JSON.parse(args);
    } catch {
      return args;
    }
  }
  return args;
}

function previewText(text, maxLen) {
  const oneLine = String(text).replace(/\s+/g, " ").trim();
  if (!oneLine) return "(empty)";
  return oneLine.length <= maxLen ? oneLine : `${oneLine.slice(0, maxLen - 1)}…`;
}

function trackEvalCalls(data, pendingEval) {
  for (const msg of data?.messages ?? []) {
    for (const tc of msg.tool_calls ?? []) {
      if (!tc.id || tc.name !== EVAL_TOOL) continue;
      const args = parseArgs(tc.args);
      const code =
        args && typeof args === "object" && typeof args.code === "string"
          ? args.code
          : "";
      pendingEval.set(tc.id, code);
      console.log(`  🧮 eval: ${previewText(code, PREVIEW_LEN)}`);
    }
  }
}

function trackFileCalls(data, pending) {
  for (const msg of data?.messages ?? []) {
    for (const tc of msg.tool_calls ?? []) {
      if (!tc.id || !tc.name || !FILE_TOOLS.has(tc.name)) continue;
      const p = pathFromArgs(tc.name, parseArgs(tc.args));
      if (p) pending.set(tc.id, { name: tc.name, path: p });
    }
  }
}

function logToolResults(data, pending, pendingEval) {
  for (const msg of data?.messages ?? []) {
    if (msg.type !== "tool") continue;

    if (msg.name === "task") {
      const preview = String(msg.content).slice(0, 120).replace(/\n/g, " ");
      console.log(`  task done: ${preview}...`);
      continue;
    }

    if (msg.name === EVAL_TOOL) {
      console.log(
        `  🧮 eval → ${previewText(msg.content, RESULT_PREVIEW_LEN)}`,
      );
      if (msg.tool_call_id) pendingEval.delete(msg.tool_call_id);
      continue;
    }

    if (!msg.name || !FILE_TOOLS.has(msg.name)) continue;

    const op = msg.tool_call_id ? pending.get(msg.tool_call_id) : undefined;
    const filePath =
      op?.path ?? String(msg.content).match(/['`](\/[^'`]+)['`]/)?.[1] ?? null;

    console.log(
      filePath ? `  ${msg.name}: ${displayPath(filePath)}` : `  ${msg.name}`,
    );
    if (msg.tool_call_id) pending.delete(msg.tool_call_id);
  }
}

async function run(query) {
  console.log(`query: ${query}`);
  console.log(`recursionLimit: ${recursionLimit}\n`);
  console.log("─".repeat(50));

  const agent = createIntelligenceDeskAgent();
  const pending = new Map();
  const pendingEval = new Map();

  for await (const [namespace, chunk] of await agent.stream(
    { messages: [new HumanMessage(query)] },
    { streamMode: "updates", subgraphs: true, recursionLimit },
  )) {
    for (const [node, data] of Object.entries(chunk)) {
      if (node === "model_request") {
        trackFileCalls(data, pending);
        trackEvalCalls(data, pendingEval);
        console.log(stepLabel(namespace, node));
      } else if (node === "tools") {
        logToolResults(data, pending, pendingEval);
      } else if (node === "todoListMiddleware.after_model") {
        console.log(stepLabel(namespace, node));
      }
    }
  }

  console.log("─".repeat(50));
}

function listMd(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}

function printOutputs() {
  const sources = listMd(path.join(projectDir, "workspace/sources"));
  const reports = listMd(path.join(projectDir, "workspace/reports"));

  if (sources.length) {
    console.log("\n sources:");
    for (const f of sources.slice(0, 8)) {
      console.log(`   ${path.relative(projectDir, f)}`);
    }
  }
  if (reports.length) {
    console.log("\n reports:");
    for (const f of reports.slice(0, 5)) {
      console.log(`   ${path.relative(projectDir, f)}`);
    }
  }
}

async function main() {
  printBanner();

  if (!process.env.OPENAI_API_KEY?.trim()) {
    console.error("Missing OPENAI_API_KEY — copy .env.example to .env");
    process.exit(1);
  }

  const query = await readQuery();
  if (!query) {
    console.error("请提供调研主题");
    process.exit(1);
  }

  try {
    await run(query);
    printOutputs();
    console.log("\n✅ done");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("Recursion limit")) {
      console.error(`\n❌ recursion limit (${recursionLimit}) — set RECURSION_LIMIT in .env`);
    } else {
      console.error("\n❌", err);
    }
    printOutputs();
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
