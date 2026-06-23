import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// 阿里云百炼兼容OpenAI地址，密钥用DASHSCOPE_API_KEY
const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

/**
 * 文本转为Embedding向量
 * @param {string} text 输入文本
 * @returns {number[]} 向量数组
 */
async function getEmbedding(text) {
  const res = await client.embeddings.create({
    // 阿里云百炼向量模型，推荐v4，也可用 text-embedding-v3 / v2
    model: "text-embedding-v4",
    input: text,
    // 可选：自定义维度，v3/v4支持
    dimensions: 1024
  });
  return res.data[0].embedding;
}

/**
 * 余弦相似度（判断两段文本语义相近程度，值越接近1越相似）
 */
function cosineSimilarity(vecA, vecB) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] ** 2;
    magB += vecB[i] ** 2;
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// 主测试逻辑
async function run() {
  const text1 = "Andrej Karpathy LLM Tokenization 分词原理";
  const text2 = "卡帕西讲解大模型BPE子词分词";
  const text3 = "今天天气晴朗，适合出门散步";

  // 获取向量
  const vec1 = await getEmbedding(text1);
  console.log(vec1, vec1.length);
  const vec2 = await getEmbedding(text2);
  const vec3 = await getEmbedding(text3);

  console.log("向量维度：", vec1.length);
  console.log("文本1 vs 文本2 相似度：", cosineSimilarity(vec1, vec2).toFixed(4));
  console.log("文本1 vs 文本3 相似度：", cosineSimilarity(vec1, vec3).toFixed(4));
}

run().catch(console.error);