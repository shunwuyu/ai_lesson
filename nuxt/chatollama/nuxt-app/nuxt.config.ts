// https://nuxt.com/docs/api/configuration/nuxt-config
import { APP_NAME } from './config/index'
import { LanguageList } from './config/i18n'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', // 自动启用
    ['@nuxtjs/i18n', {
      vueI18n: "@/config/nuxtjsI18n"
    }]
  ],
 i18n: {
    //Asynchronous call, on-demand loading
    locales: LanguageList,
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en-US',//def Language, please use Language code
    strategy: "no_prefix",
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  runtimeConfig: {
    public: {
      appName: APP_NAME,
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
