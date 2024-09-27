
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    'nuxt-icon',
    "nuxt-windicss"
  ],

  compatibilityDate: '2024-09-26',
})