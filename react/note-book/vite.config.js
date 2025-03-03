import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        },
      ],
    }),
  ],
  css: {
    // 配置 CSS Modules 的行为
    modules: {
      // 指定 CSS Modules 类名的命名约定为仅使用短横线命名
      localsConvention: 'dashesOnly'
    },
    // 配置预处理器的选项
    preprocessorOptions: {
       // 针对 Less 预处理器的配置
      less: {
        // 允许在 Less 文件中使用内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'utils': path.resolve(__dirname, 'src/utils') // src 路径
    }
  },
  server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://localhost:7001',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  }
});