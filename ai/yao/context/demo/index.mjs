// 1. 引入 dotenv 并自动配置环境变量（ESM 推荐写法）
import 'dotenv/config';

// 2. 引入 OpenAI SDK
import OpenAI from 'openai';

// 3. 初始化 OpenAI 客户端
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

// ==========================================
// 🌟 核心：上下文工程 (Context Engineering)
// ==========================================
const goodContext = {
  // 1. 需求背景：你是谁、做这事的目的
  background: "我是大学附近的奶茶店老板，客户多是 18-22 岁学生，客单价 15-20 元。",
  
  // 2. 核心约束：相关事实、限制条件
  constraints: "夏季要清爽，成本控制在 8 元内，不能和竞品的草莓奶盖重复。",
  
  // 3. 输出要求：想要的结果形式
  outputRequirements: "要颜值高（适合拍照发朋友圈）。请输出 JSON 格式，包含：饮品名、配料、成本、定价。"
};

// 将结构化上下文组装成 System Prompt（系统提示词）
const systemPrompt = `你是一个专业的饮品研发专家。请根据以下上下文信息完成任务：
【背景】${goodContext.background}
【约束】${goodContext.constraints}
【要求】${goodContext.outputRequirements}`;

// ==========================================
// 🚀 调用大模型 API
// ==========================================
async function generateNewTea() {
  try {
    console.log("⏳ 正在请求大模型，上下文工程已就绪...");
    
    const completion = await client.chat.completions.create({
      // 这里使用的是 OpenAI 最新的 GPT-4o 模型
      model: "deepseek-v4-pro", 
      
      // 消息数组：将上下文工程作为 system 角色注入
      messages: [
        { 
          role: "system", 
          content: systemPrompt 
        },
        { 
          role: "user", 
          content: "请开始你的研发设计。" 
        }
      ],
      
      // 设置温度为 0.7，保证创意和稳定性的平衡
      temperature: 0.7, 
    });

    // 提取并打印 AI 的回复
    const aiResponse = completion.choices[0].message.content;
    console.log("\n✅ AI 研发结果：");
    console.log(aiResponse);

    // 如果 AI 严格遵循了 JSON 格式要求，我们可以直接解析它
    try {
      const jsonData = JSON.parse(aiResponse);
      console.log("\n📦 成功解析为 JSON 对象：", jsonData);
    } catch (e) {
      console.log("\n⚠️ AI 返回的不是纯 JSON 格式，但内容依然有效。");
    }

  } catch (error) {
    console.error("❌ 请求失败:", error.message);
  }
}

// 执行函数
generateNewTea();