import { LanguageList } from './config/i18n'

export default defineNuxtConfig({
  auth: {
    provider: {
      type: 'local',
      endpoints: {
        getSession: { path: '/user' }
      },
      pages: {
        login: '/'
      },
      token: {
        signInResponseTokenPointer: '/token/accessToken'
      },
      sessionDataType: { id: 'string', email: 'string', name: 'string' }
    },
    session: {
      // Whether to refresh the session every time the browser window is refocused.
      enableRefreshOnWindowFocus: true,

      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enableRefreshPeriodically: false
    },
    globalAppMiddleware: {
      isEnabled: false
    }
  },
  compatibilityDate: "2024-10-02",
  modules: [
    '@nuxt/ui',
    "nuxt-windicss",
    '@vueuse/nuxt',
    "@sidebase/nuxt-auth",
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
  css: [
    '~/assets/index.scss',
  ],
  typescript: {
    strict: true,
    shim: false, // 确保不使用默认的 shims
  },
})