import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // 键是别名，值是绝对路径
      '@': path.resolve(__dirname, './src'),
      // 你还可以添加更多别名...
    }
  }
})
