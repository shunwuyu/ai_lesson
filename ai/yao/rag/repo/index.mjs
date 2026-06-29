import 'dotenv/config';
import OpenAI from 'openai';
import * as readline from 'readline';

// ==========================================
// 1. 初始化客户端与模拟法律数据库
// ==========================================
const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

// 模拟的法律文书数据（实际项目中可替换为读取本地 JSON/TXT 文件）
const legalDocs = [
  { id: 1, content: "《劳动合同法》第四十七条规定：经济补偿按劳动者在本单位工作的年限，每满一年支付一个月工资的标准向劳动者支付。六个月以上不满一年的，按一年计算；不满六个月的，向劳动者支付半个月工资的经济补偿。" },
  { id: 2, content: "《劳动合同法》第三十九条规定：劳动者有下列情形之一的，用人单位可以解除劳动合同：（一）在试用期间被证明不符合录用条件的；（二）严重违反用人单位的规章制度的；（三）严重失职，营私舞弊，给用人单位造成重大损害的。" },
  { id: 3, content: "《劳动合同法》第八十七条规定：用人单位违反本法规定解除或者终止劳动合同的，应当依照本法第四十七条规定的经济补偿标准的二倍向劳动者支付赔偿金。" },
];

// ==========================================
// 2. 核心数学工具：计算余弦相似度
// ==========================================
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

// ==========================================
// 3. RAG 核心流程：向量化与检索
// ==========================================
async function getEmbedding(text) {
  const res = await client.embeddings.create({
    model: "text-embedding-v4",
    input: text,
    dimensions: 1024
  });
  return res.data[0].embedding;
}

// 启动时预计算所有法律条文的向量
async function buildVectorStore(docs) {
  console.log("⚙️ 正在构建法律文书向量库...");
  const vectorStore = [];
  for (const doc of docs) {
    const embedding = await getEmbedding(doc.content);
    vectorStore.push({ ...doc, embedding });
  }
  console.log("✅ 向量库构建完成！\n");
  return vectorStore;
}

// 检索最相关的法律条文
async function retrieveContext(query, vectorStore, topK = 2) {
  const queryEmbedding = await getEmbedding(query);
  const results = vectorStore.map(doc => ({
    content: doc.content,
    score: cosineSimilarity(queryEmbedding, doc.embedding)
  }));
  
  // 按相似度降序排序并取 Top-K
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK).map(r => r.content).join("\n\n");
}

// ==========================================
// 4. 聊天生成与终端交互
// ==========================================
async function generateAnswer(question, context) {
  const completion = await client.chat.completions.create({
    model: "qwen-plus",
    messages: [
      {
        role: "system",
        content: `你是一个专业的中国法律顾问。请严格根据以下法律条文回答用户问题。如果条文中没有相关信息，请明确告知用户“根据现有资料无法回答”。回答时请引用具体的法律条款。

【参考资料】：
${context}`
      },
      { role: "user", content: question }
    ],
  });
  return completion.choices[0].message.content;
}

// 主程序入口
async function main() {
  // 1. 初始化知识库
  const vectorStore = await buildVectorStore(legalDocs);

  // 2. 创建终端读取流
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("👋 欢迎使用法律智能助手！(输入 'exit' 退出程序)\n");

  // 3. 开启对话循环
  const askQuestion = async () => {
    rl.question("🙋 你的提问: ", async (question) => {
      if (question.toLowerCase() === 'exit') {
        console.log("👋 再见！");
        rl.close();
        process.exit(0);
      }

      try {
        // RAG 检索
        const context = await retrieveContext(question, vectorStore);
        // LLM 生成
        const answer = await generateAnswer(question, context);
        console.log(`\n🤖 法律助手: ${answer}\n`);
      } catch (error) {
        console.error("\n❌ 发生错误:", error.message, "\n");
      }

      // 继续下一轮提问
      askQuestion();
    });
  };

  askQuestion();
}

main();