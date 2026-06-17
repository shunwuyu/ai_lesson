import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
// 1. 初始化客户端（DeepSeek 兼容 OpenAI 的接口规范）
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // 建议在环境变量中配置密钥
  baseURL: 'https://api.deepseek.com',
});

async function testStateless() {
  // --- 第一次请求：告诉模型一个信息 ---
  console.log('>>> 第一次请求：告诉模型一个秘密');
  const response1 = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: '你是一个严谨的助手。' },
      { role: 'user', content: '请记住，我的名字叫"测试用户007"。' }
    ]
  });
  console.log('模型回复:', response1.choices[0].message.content, '\n');

  // --- 第二次请求：完全独立，不带上文 ---
  console.log('>>> 第二次请求：直接问它我是谁（测试无状态）');
  const response2 = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: '你是一个严谨的助手。' },
      { role: 'user', content: '请问我的名字是什么？' }
    ]
  });
  console.log('模型回复:', response2.choices[0].message.content);
}

testStateless().catch(console.error);