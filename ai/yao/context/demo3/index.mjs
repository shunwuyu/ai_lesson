import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const client = new OpenAI({ 
  apiKey: process.env.DEEPSEEK_API_KEY, 
  baseURL: process.env.DEEPSEEK_BASE_URL });

// ==========================================
// 1. 数据读取与上下文提取引擎
// ==========================================
async function fetchOrderContext(orderId) {
  try {
    // 读取本地 JSON 文件
    const filePath = path.resolve('orders.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const orders = JSON.parse(rawData);

    // 根据订单 ID 精准查找
    const order = orders.find(o => o.order_id === orderId);

    if (!order) {
      return null; // 如果找不到，返回 null 让 AI 知道没有这个订单
    }

    // 将 JSON 对象格式化为易读的字符串（AI 对格式化好的 JSON 理解力更强）
    return JSON.stringify(order, null, 2);
  } catch (error) {
    console.error("❌ 读取订单文件失败:", error.message);
    return null;
  }
}

// ==========================================
// 2. 动态上下文组装与 AI 对话
// ==========================================
async function askAboutOrder(userQuestion, orderId) {
  console.log(`\n🙋 用户提问: ${userQuestion} (订单号: ${orderId})`);

  // Step 1: 动态获取上下文
  const orderContext = await fetchOrderContext(orderId);

  // Step 2: 构建动态 System Prompt
  let systemPrompt;
  if (orderContext) {
    systemPrompt = `你是一个智能订单客服。请严格基于以下【订单数据】回答用户的问题。
不要编造数据，如果数据中没有相关信息，请如实告知。

【订单数据】
${orderContext}`;
  } else {
    systemPrompt = `你是一个智能订单客服。用户查询的订单号不存在，请礼貌地告诉用户查不到该订单，并询问是否需要其他帮助。`;
  }

  // Step 3: 调用大模型
  const completion = await client.chat.completions.create({
    model: "deepseek-v4-pro",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userQuestion }
    ],
    temperature: 0, // 查询订单事实时，温度必须设为 0
  });

  console.log("✅ AI 回答:", completion.choices[0].message.content);
}

// ==========================================
// 3. 运行测试
// ==========================================
// 测试存在的订单
askAboutOrder("我的订单什么时候能到？", "ORD-2024-001");

// 延迟一下再测试不存在的订单，避免并发冲突
setTimeout(() => {
  askAboutOrder("李四的订单为什么还没发货？", "ORD-2024-002");
}, 3000);

setTimeout(() => {
  askAboutOrder("帮我查一下 ORD-999 的物流状态", "ORD-999");
}, 6000);