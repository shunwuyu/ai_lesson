import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    // model: "qwen3.6-flash", // 这个模型现在可以正常使用
    // qwen-plus = 均衡全能、推理更强
    // qwen3.6-flash = 极速轻量、成本更低
    // 两者是通义千问不同定位的主力模型
    model: "qwen-plus",
    messages: [{ role: "user", content: "你好" }],
  });
  console.log(chatCompletion.choices[0].message.content);
}

main();