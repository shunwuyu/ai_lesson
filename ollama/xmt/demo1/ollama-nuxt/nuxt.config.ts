import { APP_NAME } from './config/index'
import { LanguageList } from './config/i18n'

export default defineNuxtConfig({
  
  modules: ['@nuxt/ui', "nuxt-windicss",  ['@nuxtjs/i18n', {
    vueI18n: "@/config/nuxtjsI18n"
  }]],
  compatibilityDate: '2024-09-28',
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/logo.svg',
        },
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width',
        }
      ],
      title: APP_NAME,
    }
  },
  runtimeConfig: {
    public: {
      kb: {
        create: {
          role: ''
        }
      },
      modelProxyEnabled: false,
      chatMaxAttachedMessages: 50,
      appName: APP_NAME
    }
  },
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
})