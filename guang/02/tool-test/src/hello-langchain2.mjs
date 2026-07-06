import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
dotenv.config();

const model = new ChatOpenAI({
    modelName: "deepseek-v4-flash",
    apiKey: '',
    configuration: {
        baseURL: 'https://api.deepseek.com',
    }
});
// 简洁
const response = await model.invoke("介绍下自己");
console.log(response.content);