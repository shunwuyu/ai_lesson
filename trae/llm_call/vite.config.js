import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: { port: 5173, open: true },
  preview: { port: 5173, open: true },
  build: { outDir: 'dist', assetsInlineLimit: 4096 },
  resolve: { alias: { '@': '/src' } }
})