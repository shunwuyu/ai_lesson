# nuxt shop

- npx nuxi@latest init shop-vue
- layouts/ 
- pages/
- tailwindcss
  - npm install -D @nuxtjs/tailwindcss
  - nuxt.config.ts
    // nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss' // 添加这一行
  ]
})
  - npx tailwindcss init
  - tailwind.config.js
  ```js
  // tailwind.config.js
export default {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
  ```
- 导入 components/common/AppHeader
- 导入 components/common/AppLogo
  npm i lucide-vue-next  