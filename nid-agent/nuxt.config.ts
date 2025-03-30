// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
    openaiBaseUrl: process.env.NUXT_OPENAI_BASE_URL,
    deepseekApiKey: process.env.NUXT_DEEPSEEK_API_KEY,
    deepseekBaseUrl: process.env.NUXT_DEEPSEEK_BASE_URL
  },
})
