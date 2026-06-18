import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // 建议在环境变量中配置密钥
  baseURL: 'https://api.deepseek.com/v1',
});


// 刹车限制（原文三个刹车）
const limit = { maxRound: 5, maxToken: 2000, sameStop: 2 };
// 任务+可量化校验标准
const task = {
  desc: "小红书美妆文案",
  rules: ["标题带数字", "正文<300字", "结尾有行动号召"]
};

// 全局状态
let round = 0, totalToken = 0, lastText = "", sameCount = 0;

// 生成文案
async function gen() {
  const res = await client.chat.completions.create({
    model: "deepseek-v4-flash",
    messages: [{
      role: "user",
      content: `写${task.desc}，严格遵守：${task.rules.join("、")}，只输出文案`
    }]
  });
  console.log(res.usage.total_tokens);

  return { text: res.choices[0].message.content.trim(), token: res.usage.total_tokens };
}

// AI自检是否达标
async function check(text) {
  const res = await client.chat.completions.create({
    model: "deepseek-v4-flash",
    messages: [{
      role: "user",
      content: `校验文案：${text}，规则：${task.rules.join("、")}，仅输出JSON {pass:布尔, fail:数组}`
    }]
  });

  console.log(res.choices[0].message.content);
  return JSON.parse(res.choices[0].message.content.trim());
}

// 判断是否触发刹车
function needStop() {
  return round >= limit.maxRound || totalToken >= limit.maxToken || sameCount >= limit.sameStop;
}

// 主循环
async function runLoop() {
  console.log("AI Loop 开始");
  while (!needStop()) {
    round++;
    console.log(`\n第${round}轮`);

    // 生成内容
    const { text, token } = await gen();
    totalToken += token;
    sameCount = text === lastText ? sameCount + 1 : 0;
    lastText = text;

    // 校验
    const { pass, fail } = await check(text);
    if (pass) {
      console.log("✅ 全部规则通过，循环结束");
      return console.log("\n最终文案：\n", text);
    }
    console.log("❌ 不满足：", fail);
  }
  console.log("\n⚠️ 触发刹车强制停止，最后一次内容：", lastText);
}

runLoop().catch(e => console.error(e));