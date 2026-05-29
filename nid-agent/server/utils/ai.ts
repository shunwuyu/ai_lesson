import { createDeepSeek } from '@ai-sdk/deepseek'
import { createOpenAI } from '@ai-sdk/openai'

const config = useRuntimeConfig();
// console.log(config, '???')
export const deepseekProvider = createDeepSeek({
    apiKey: config.deepseekApiKey,
    baseURL: config.deepseekBaseUrl,
})

export const openaiProvider = createOpenAI({
    apiKey: config.openaiApiKey,
    baseURL: config.openaiBaseUrl,
})
