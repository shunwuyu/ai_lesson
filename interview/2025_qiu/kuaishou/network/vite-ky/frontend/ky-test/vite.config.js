import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 代理所有以 /api 开头的请求
      '/api': {
        target: 'http://localhost:3000',  // 后端地址
        changeOrigin: true,               // 支持跨域
        rewrite: (path) => path.replace(/^\/api/, '/api') // 可选：重写路径
      }
    }
  }
})
