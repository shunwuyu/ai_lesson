import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:process.env.OPENAI_KEY,
    baseURL:'https://api.gptsapi.net/v1'
})

const response = await client.embeddings.create({
    model: "text-embedding-ada-002",
    input: "如何创建 Vue.js 组件"
})

console.log(response.data[0].embedding)