import { createOpenAI } from '@ai-sdk/openai';

export const openai = createOpenAI({
  apiKey: process.env.NUXT_OPENAI_API_KEY,
  baseURL: process.env.NUXT_OPENAI_BASE_URL,
});
