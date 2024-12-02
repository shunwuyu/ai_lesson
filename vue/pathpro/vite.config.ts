import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import { VantResolver } from "@vant/auto-import-resolver"
import Components from "unplugin-vue-components/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }
})
