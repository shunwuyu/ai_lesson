import OpenAI from 'openai'
import { configDotenv  } from 'dotenv';
configDotenv();
console.log(process.env.DEEPSEEK_API_KEY,process.env.DEEPSEEK_BASE_URL)
export const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL,
})