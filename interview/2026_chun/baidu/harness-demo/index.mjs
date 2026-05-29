import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

// 1️⃣ 调用 LLM
async function askLLM(prompt) {
  const res = await client.chat.completions.create({
    model: process.env.MODEL_NAME,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7, // 保持一定随机性
  });

  return res.choices[0].message.content;
}

// 2️⃣ 多生成几个候选结果
async function generateCandidates(prompt, n = 3) {
  const tasks = Array.from({ length: n }, () => askLLM(prompt));
  return Promise.all(tasks);
}

// 3️⃣ 用 LLM 做评测（关键点🔥）
async function judge(code) {
  const prompt = `
你是一个严格的代码评审，请判断下面代码是否正确实现“数组去重函数”。

要求：
- 只返回一个数字评分（0-10）
- 不要解释

代码：
${code}
`;

  const res = await askLLM(prompt);

  const score = parseFloat(res);
  return isNaN(score) ? 0 : score;
}

// 4️⃣ 评估所有候选
async function evaluateAll(candidates) {
  const results = [];

  for (const code of candidates) {
    const score = await judge(code);
    results.push({ code, score });
  }

  return results;
}

// 5️⃣ 选最优
function pickBest(results) {
  return results.sort((a, b) => b.score - a.score)[0];
}

// 6️⃣ Harness 主流程
async function harness(prompt) {
  console.log("👉 Generating candidates...\n");

  const candidates = await generateCandidates(prompt, 3);

  console.log("候选结果：");
  candidates.forEach((c, i) => {
    console.log(`\n--- Candidate ${i + 1} ---\n${c}`);
  });

  console.log("\n👉 Evaluating...\n");

  const evaluated = await evaluateAll(candidates);

  evaluated.forEach((r, i) => {
    console.log(`Candidate ${i + 1} Score:`, r.score);
  });

  const best = pickBest(evaluated);

  console.log("\n🏆 Best Result:\n", best.code);

  return best.code;
}

// 运行
harness("请用 JavaScript 实现一个数组去重函数");