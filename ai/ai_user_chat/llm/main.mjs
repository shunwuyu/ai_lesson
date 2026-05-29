import OpenAI from 'openai';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 配置 DeepSeek API
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});

const COMPLETION_MODEL = 'deepseek-chat';

const prompt = `
Consideration product : 工厂现货PVC充气青蛙夜市地摊热卖充气玩具发光蛙儿童水上玩具

1. Compose human readable product title used on Amazon in english within 20 words.
2. Write 5 selling points for the products in Amazon.
3. Evaluate a price range for this product in U.S.

Output the result in json format with three properties called title, selling_points and price_range
`;

async function getResponse(prompt) {
  const response = await client.chat.completions.create({
    model: COMPLETION_MODEL,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1024,
    temperature: 0.0,
  });
  return response.choices[0].message.content;
}

// 执行并输出结果
(async () => {
  const result = await getResponse(prompt);
  console.log(result);
})();