import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// 1. 初始化客户端
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

// 2. 核心：创建一个数组来维护聊天历史
const chatHistory = [
  { role: 'system', content: '你是一个严谨的助手。' }
];

async function chat() {
  // --- 第一次对话 ---
  console.log('>>> 用户：请记住，我的名字叫"测试用户007"。');
  
  // 1. 将用户的新消息添加到历史中
  chatHistory.push({ role: 'user', content: '请记住，我的名字叫"测试用户007"。' });

  // 2. 将整个历史发送给模型
  const response1 = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: chatHistory,
  });

  const reply1 = response1.choices[0].message.content;
  console.log('模型回复:', reply1, '\n');

  // 3. 将模型的回复也添加到历史中
  chatHistory.push({ role: 'assistant', content: reply1 });


  // --- 第二次对话 ---
  console.log('>>> 用户：请问我的名字是什么？');

  // 1. 添加新问题到历史
  chatHistory.push({ role: 'user', content: '请问我的名字是什么？' });

  // 2. 再次发送包含所有历史的数组
  const response2 = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: chatHistory,
  });

  const reply2 = response2.choices[0].message.content;
  console.log('模型回复:', reply2);

  // 3. 更新历史
  chatHistory.push({ role: 'assistant', content: reply2 });
}

chat().catch(console.error);