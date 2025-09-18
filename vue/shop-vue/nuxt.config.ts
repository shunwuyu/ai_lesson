// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss' // 添加这一行
  ],
  supabase: {
    redirect: false,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
