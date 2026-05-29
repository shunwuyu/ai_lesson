import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config({path: '.env'});

export const client = new OpenAI({
    apiKey:process.env.OPENAI_KEY,
    baseURL:process.env.OPENAI_BASE_URL
})