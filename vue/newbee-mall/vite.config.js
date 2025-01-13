// node:url 是 Node.js 中的一个内置模块，用于处理 URL。
// 这个函数用于将文件 URL 转换为文件路径
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 当前模块的 URL 
// import.meta.url
// console.log(new URL('./src', import.meta.url))
// console.log(import.meta.url) // file:///D:/newbee-mall/vue/newbee-mall/src/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
