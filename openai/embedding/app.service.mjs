import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config({path: '.env'});

export const client = new OpenAI({
    apiKey:process.env.OPENAI_KEY,
    baseURL:'https://api.gptsapi.net/v1'
})

