import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import htmlMinifyPlugin from './plugins/vite-plugin-html-minify'; // 引入你的插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htmlMinifyPlugin()
  ],
})
