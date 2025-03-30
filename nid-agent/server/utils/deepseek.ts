import OpenAI from 'openai'

const config = useRuntimeConfig()

export const deepseek = new OpenAI({
    apiKey: config.deepseekApiKey,
    baseURL: config.deepseekBaseUrl
})


