import OpenAI from "openai";
import 'dotenv/config';
// console.log(process.env.MODEL_NAME, '/////');
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

async function cotExample() {
  const res = await client.chat.completions.create({
    model: process.env.MODEL_NAME,
    messages: [
      {
        role: "user",
        content: `
请一步一步思考，并解决问题：
一个商品100元，打8折再减10元，最终价格是多少？
        `,
      },
    ],
  });

  console.log(res.choices[0].message.content);
}

cotExample();