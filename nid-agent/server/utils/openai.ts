import OpenAI from 'openai'

const config = useRuntimeConfig()

export const openai = new OpenAI({
    apiKey: config.openaiApiKey,
    baseURL: config.openaiBaseUrl
})

