import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:process.env.DASHSCOPE_API_KEY,
    baseURL:"https://dashscope.aliyuncs.com/compatible-mode/v1"
})

const response = await client.embeddings.create({
    // text-embedding-ada-002 是 OpenAI 推出的高效文本嵌入模型，
    // 能将任意文本转换为 1536 维的向量，广泛用于语义搜索
    model: "text-embedding-v4",
    input: "如何创建 Vue.js 组件"
})

console.log(response.data[0].embedding)