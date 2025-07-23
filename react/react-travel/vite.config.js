import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServe({
    // default
    mockPath: 'mock',
    localEnabled: true,
  })],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
})
