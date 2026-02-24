import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
dotenv.config();

const model = new ChatOpenAI({
    modelName: "qwen-coder-turbo",
    apiKey: 'sk-c2f22640cc3c4481ab77507b49dda265',
    configuration: {
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    },
});

const response = await model.invoke("介绍下自己");
console.log(response.content);