import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    viteMockServe({
      mockPath: "src/mock"
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
