import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   // 拦截所有以 /api 开头的请求
    //   '/api': {
    //     // 1. 目标后端服务器地址
    //     target: 'http://localhost:3000',
    //     // 2. 允许跨域：将请求头的 Origin 修改为目标服务器的域名
    //     changeOrigin: true,
    //     // 3. 路径重写：去掉 /api 前缀
    //     // 例如：前端请求 /api/todos -> 转发给后端 /todos
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  }
})
