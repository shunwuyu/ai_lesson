import 'dotenv/config';
import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());
// 解析 JSON 请求体
app.use(express.json());

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

/**
 * 计算两段文本的相似度
 * @param {string} text1 - 第一段文本
 * @param {string} text2 - 第二段文本
 * @returns {Promise<number>} 相似度分数 (0-1)
 */
async function calculateSimilarity(text1, text2) {
    try {
        // 获取两段文本的嵌入向量
        const [embedding1, embedding2] = await Promise.all([
            getEmbedding(text1),
            getEmbedding(text2)
        ]);

        // 计算余弦相似度
        const similarity = cosineSimilarity(embedding1, embedding2);
        return similarity;
    } catch (error) {
        console.error('计算相似度时出错:', error);
        throw error;
    }
}

// API 路由
app.post('/api/similarity', async (req, res) => {
    try {
        const { text1, text2 } = req.body;
        
        // 验证输入
        if (!text1 || !text2) {
            return res.status(400).json({
                error: '缺少必要的参数: text1 和 text2'
            });
        }

        // 计算相似度
        const similarity = await calculateSimilarity(text1, text2);
        
        // 返回结果
        res.json({
            similarity: similarity,
            text1: text1,
            text2: text2
        });
    } catch (error) {
        console.error('API错误:', error);
        res.status(500).json({
            error: '服务器内部错误',
            message: error.message
        });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});