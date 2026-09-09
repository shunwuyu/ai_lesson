import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL, // 可选
});

const res = await client.chat.completions.create({
  model: process.env.MODEL_NAME,
  messages: [{ role: "user", content: "hello" }],
});

console.log(res.choices[0].message.content);