import { embedMany } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const openai = createOpenAI({
        apiKey: config.openaiApiKey,
        baseURL: config.openaiBaseURL
    })

    const text = [
        `
        name: startupintell
        founder: 王皓
        oneliner: 软件创始人的工具箱
        founded: 2025-02-12
        founding: 2000000
        `,
        `
        name: initialstream
        founder: 王皓
        oneliner: SaaS 应用快速启动模版
        founded: 2025-02-12
        founding: 1000000
        `
    ];

    const results = await embedMany({
        model: openai.embedding('text-embedding-3-small'),
        values: text
    })

    return { results };
})