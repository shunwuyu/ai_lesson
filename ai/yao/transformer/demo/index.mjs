import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// 兼容地址
const BASE_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1';

// 实例化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.QWEN_API_KEY,
  baseURL: BASE_URL
});

// 极简版位置编码计算公式
// 第0位猫：getPosCode(0) = 0 * 0.1 = 0
// 第1位追：getPosCode(1) = 1 * 0.1 = 0.1
// 第2位狗：getPosCode(2) = 2 * 0.1 = 0.2
// 位置靠前，加的数值小；位置靠后，加的数值大
// 相同的字，放在不同位置，最终向量数值就不一样
// 模型就能识别语序。
const getPosCode = (pos) => pos * 0.1;
// 向量叠加位置编码
// 遍历向量里每一个数字，全部统一加上位置数值。
const addPosEmbedding = (vec, posValue) => vec.map(num => num + posValue);

// 获取Qwen text-embedding-v4 向量
async function getEmbedding(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-v4',
    input: text
  });
  return res.data[0].embedding;
}

// 主逻辑
async function main() {
  const text1 = '猫追狗';
  const text2 = '狗追猫';

  const emb1 = await getEmbedding(text1);
  const emb2 = await getEmbedding(text2);

  // 给序列第0位添加位置编码
  const pos0 = getPosCode(0);
  const vec1 = addPosEmbedding(emb1, pos0);
  const vec2 = addPosEmbedding(emb2, pos0);

  console.log('猫追狗 向量前5维：', vec1.slice(0, 5));
  console.log('狗追猫 向量前5维：', vec2.slice(0, 5));
}

main().catch(console.error);