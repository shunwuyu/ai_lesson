import OpenAI from "openai";
const openai = new OpenAI({
  apiKey:'sk-pWKWQSROz2c8Ccx2jU4xUIOC0WVFn1zkcaSKHTUwWZRTQAKK',
  // 国内转发
  baseURL: 'https://api.302.ai/v1'
});

const response = await openai.completions.create({
  model: 'grok-beta',
  max_tokens:256,
  prompt: `Consideration product : 工厂现货PVC充气青蛙夜市地摊热卖充气玩具发光蛙儿童水上玩具

1. Compose human readable product title used on Amazon in english within 20 words.
2. Write 5 selling points for the products in Amazon.
3. Evaluate a price range for this product in U.S.

Output the result in json format with three properties called title, selling_points and price_range`
})

console.log(response)