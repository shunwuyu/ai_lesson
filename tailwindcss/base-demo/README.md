npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,vue,js,ts}', // 确保路径匹配你的项目结构
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


/* src/assets/tailwind.css */

/* src/assets/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css'; // 导入 Tailwind 样式

createApp(App).mount('#app');


