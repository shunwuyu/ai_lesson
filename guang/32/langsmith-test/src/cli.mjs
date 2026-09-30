import "dotenv/config";
import { ask } from "./rag_agent.mjs";
// 服务给agent 调用
const DEFAULT_QUESTIONS = [
  "无理由退货要在几天内？",
  // "满多少元包邮？",
  // "金卡会员有什么折扣？",
  // "电子发票多久能开好？",
  // "手机保修多久？",
  // "紧急问题怎么联系客服？",
];

// `process.argv` 获取 node 启动时全部命令行参数，`slice(2)` **切掉前两个固定项，拿到你传入的自定义参数数组**。
// node index.js hello 123  切掉 node index.js 
// process.argv 返回数组
const args = process.argv.slice(2);
const questions = args.length > 0 ? [args.join(" ")] : DEFAULT_QUESTIONS;

function printContext(context) {
  if (!context.length) {
    console.log("\n引用片段: （无）");
    return;
  }
  console.log("\n引用片段:");
  context.forEach((doc, i) => {
    const source = doc.metadata?.source ?? "未知";
    const text = doc.pageContent.replace(/\s+/g, " ").trim();
    const preview = text.length > 100 ? `${text.slice(0, 100)}…` : text;
    console.log(`  [${i + 1}] ${source}`);
    console.log(`      ${preview}`);
  });
}

for (let i = 0; i < questions.length; i++) {
  const question = questions[i];
  console.log(`\n${"=".repeat(50)}`);
  console.log(`问题 ${i + 1}: ${question}`);

  const { answer, context } = await ask(question);
  console.log(`\n答: ${answer}`);
  printContext(context);
}

console.log(`\n${"=".repeat(50)}`);
console.log(`共 ${questions.length} 个问题`);
