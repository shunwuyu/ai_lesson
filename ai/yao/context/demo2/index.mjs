import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({ 
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
 });

 // 阿里云百炼兼容OpenAI地址，密钥用DASHSCOPE_API_KEY
 const client2 = new OpenAI({
   apiKey: process.env.DASHSCOPE_API_KEY,
   baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
 });

// ==========================================
// 1. 模拟知识库 (Knowledge Base)
// ==========================================
const knowledgeBase = [
  { id: 1, content: "公司的年假政策：入职满一年享5天年假，满三年享10天，年假不可跨年累计。" },
  { id: 2, content: "员工报销流程：每月25号前在OA系统提交发票，部门经理审批后，财务于次月5号打款。" },
  { id: 3, content: "公司提供免费下午茶，时间为每周三下午 15:00-16:00，地点在二楼休息区。" },
];

// ==========================================
// 2. 核心数学工具：计算余弦相似度 (Cosine Similarity)
// 衡量两个向量在多维空间中的夹角，值越接近 1 表示语义越相似
// ==========================================
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

async function getEmbedding(text) {
  const res = await client2.embeddings.create({
    // 阿里云百炼向量模型，推荐v4，也可用 text-embedding-v3 / v2
    model: "text-embedding-v4",
    input: text,
    // 可选：自定义维度，v3/v4支持
    dimensions: 1024
  });
  return res.data[0].embedding;
}


// ==========================================
// 3. 检索引擎：基于 Embedding 的语义查找
// ==========================================
async function semanticSearch(userQuery, topK = 1) {
  const queryVector = await getEmbedding(userQuery);
  console.log(queryVector, '/////////////');
  // 3.2 将知识库所有片段转为向量（实际生产中这一步应在启动时完成并缓存）
  const docVectors = await Promise.all(
    knowledgeBase.map(async doc => 
      await getEmbedding(doc.content)
    )
  );

  // 3.3 计算相似度并排序
  const results = docVectors.map((vec, index) => ({
    ...knowledgeBase[index],
    score: cosineSimilarity(queryVector, vec),
  }));

  // 3.4 返回得分最高的 topK 个结果
  return results.sort((a, b) => b.score - a.score).slice(0, topK);
}

// ==========================================
// 4. RAG 主流程：检索 -> 增强 -> 生成
// ==========================================
async function askRAG(question) {
  console.log(`\n🙋 用户提问: ${question}`);
  // Step 1: 检索相关上下文
  const relevantDocs = await semanticSearch(question);
  console.log(`🔍 检索到的知识 (相似度: ${relevantDocs[0].score.toFixed(4)}):`, relevantDocs[0].content);

  // Step 2: 组装上下文 (Augmentation)
  const contextText = relevantDocs.map(doc => doc.content).join("\n");
  const systemPrompt = `你是一个专业的企业HR助手。请严格基于以下【参考资料】回答问题。如果参考资料中没有相关信息，请直接回答“不确定”，不要自己编造。

【参考资料】
${contextText}`;

  // Step 3: 调用大模型生成 (Generation)
  const completion = await client.chat.completions.create({
    model: "deepseek-v4-pro",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question }
    ],
    temperature: 0,
  });

  console.log("✅ AI 回答:", completion.choices[0].message.content);
}

// ==========================================
// 5. 运行测试
// ==========================================
askRAG("我想知道报销的具体流程是什么？");