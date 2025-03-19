import 'dotenv/config';
import OpenAI from 'openai';
import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { client } from './app.service.mjs'
import fs from 'fs/promises'
const inputFilePath = './data/posts_with_embedding.json'

const data = await fs.readFile(inputFilePath, "utf-8")
const posts = JSON.parse(data);

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());
app.use(bodyParser());
// 解析 JSON 请求体
// app.use(express.json());

// 初始化 OpenAI 客户端
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});

/**
 * 计算两段文本的余弦相似度
 * @param {number[]} a - 第一个向量
 * @param {number[]} b - 第二个向量
 * @returns {number} 相似度分数 (0-1)
 */
function cosineSimilarity(a, b) {
    if (a.length !== b.length) {
        throw new Error('向量长度不匹配');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * 获取文本的嵌入向量
 * @param {string} text - 输入文本
 * @returns {Promise<number[]>} 嵌入向量
 */
async function getEmbedding(text) {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text
    });
    return response.data[0].embedding;
}

router.post('/search', async (ctx) => {
    const { keyword } = ctx.request.body;
    console.log(keyword)
    const response = await client.embeddings.create({
        model: 'text-embedding-ada-002',
        input:keyword  
      })

    const { embedding } =  response.data[0];
    console.log(embedding)
    const results = posts.map(item => ({
    ...item,
    similarity: cosineSimilarity(embedding, item.embedding)
    }))
    .sort((a, b) => a.similarity - b.similarity)
    .reverse()
    .slice(0, 3)
    .map((item, index) => ({id: index, title:`${index + 1}.${item.title}, ${item.category}`}))
    
    ctx.body = {
        status:200,
        data:results
    }
    
   
});

app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});