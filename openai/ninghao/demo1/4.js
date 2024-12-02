require('dotenv').config();
const OpenAI = require('openai');
const { getCompletion } = require('./utils')
// 现在你可以像使用普通环境变量一样使用它
const openaiApiKey = process.env.OPENAI_KEY;
console.log(openaiApiKey, '////');

const client = new OpenAI({
    // 凭证 密钥  算力收费  token
    apiKey: openaiApiKey,
    baseURL: 'https://api.chatanywhere.tech/v1'
})


// 示例：打印出API Key以确认是否成功读取
// console.log(openaiApiKey);

// async function getCompletion(prompt, model = "gpt-3.5-turbo") {
//     try {
//       const response = await client.chat.completions.create({
//         model,
//         messages: [
//             {role: "system", content: `宁浩网是一个学习软件开发技术的平台，
//             你是宁浩网的客服机器人，你的名字叫小宁。每次对话都加入微笑emoji表情符号。`},
//             { role: "user", content: prompt }],
//         temperature: 0, // 控制输出的随机性，0表示更确定的输出
//       });
  
//       return response.choices[0].message.content;
//     } catch (error) {
//       console.error("Error fetching completion:", error);
//       throw error;
//     }
// }

// 使用示例

;(async () => {
    try {
        const prompt = `
        你是谁？
        `
      const completion = await getCompletion(client, prompt);
      console.log(completion);
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
})();
  