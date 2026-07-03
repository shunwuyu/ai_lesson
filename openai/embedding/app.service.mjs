import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config({path: '.env'});

export const client = new OpenAI({
    apiKey:process.env.DASHSCOPE_API_KEY,
    baseURL:"https://dashscope.aliyuncs.com/compatible-mode/v1"
})

