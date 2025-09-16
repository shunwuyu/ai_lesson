# chatollama

- Nuxt 是基于 Vue.js 的框架，简化服务端渲染与静态站点生成，提供模块化架构，提升开发效率与用户体验。
- npm init nuxt@latest
  No 可以不选任何模块，后续需要时再通过 npx nuxi add module <name> 添加
- .env
  PORT=1234
- server/api/blog/index.get.ts
- app.vue
- layouts/default.vue
- pages/index.vue
- tailwindcss
  - pnpm add -D @nuxtjs/tailwindcss
  - modules: [
    '@nuxtjs/tailwindcss' // 自动启用
  ]

- 配置 APP_NAME
  - config/index.ts
  - nuxt.config.ts

- i18n
  - "@nuxtjs/i18n": "^8.3.1",
  - i18n.config.ts
  - nuxt.config.ts
  - config/i18n.ts
  - config/nuxtjsI18n.ts
  - locales/zh-CN.json
  - locales/en-US.json
  
