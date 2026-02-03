import fs from 'fs/promises'
import { client } from './app.service.mjs'
// readline 是 Node.js 内置模块，用于逐行读取用户输入
// （如命令行交互）或文件流，常用于构建交互式命令行工具。
import readline from 'readline';

const inputFilePath = './data/posts_with_embedding.json'

const data = await fs.readFile(inputFilePath, "utf-8")
const posts = JSON.parse(data);

// 创建 readline 接口实例
const rl = readline.createInterface({
  input: process.stdin,// 输入源：标准输入（通常是键盘）
  output: process.stdout // 输出目标：标准输出（通常是终端屏幕）
});

// 计算向量的余弦相似度
// 向量是从原点出发的箭头 余弦值看的是它们“方向”有多一致
// 如果箭头指向几乎同一个方向（比如“猫”和“狗”都是动物），余弦值接近 1，很相似；
// 如果方向垂直，余弦值是 0，基本不相关；
// 如果方向完全相反，余弦值是 -1，意思可能对立。
const cosineSimilarity = (v1, v2) => {
  // 计算向量的点积
  const dotProduct = v1.reduce((acc, curr, i) => acc + curr * v2[i], 0);

  // 计算向量的长度
  const lengthV1 = Math.sqrt(v1.reduce((acc, curr) => acc + curr * curr, 0));
  const lengthV2 = Math.sqrt(v2.reduce((acc, curr) => acc + curr * curr, 0));

  // 计算余弦相似度
  const similarity = dotProduct / (lengthV1 * lengthV2);

  return similarity;
};

const handleInput = async (input) => {
  // 将输入先embedding 转换为向量
  const response = await client.embeddings.create({
    model: 'text-embedding-ada-002',
    input  
  })

  const { embedding } =  response.data[0];
  const results = posts.map(item => ({
    ...item,
    // 计算输入向量与每个帖子向量的余弦相似度
    similarity: cosineSimilarity(embedding, item.embedding)
  }))
  // 按相似度排序，取前3个
  .sort((a, b) => a.similarity - b.similarity)
  // 倒序排序，取前3个
  .reverse()
  .slice(0, 3)
  .map((item, index) => `${index + 1}.${item.title}, ${item.category}`)
  .join("\n");

  console.log(`\n${results}\n`);
  rl.question("\n请输入要搜索的内容：", handleInput);
};

rl.question("\n请输入要搜索的内容：", handleInput);