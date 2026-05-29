import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      // 要自动导入的模块
      imports: [
        'react',                    // 自动导入 useState, useEffect 等
        'react-router-dom',         // 自动导入 useNavigate, useParams 等
      ],
      // 生成 .d.ts 类型声明文件（解决 TS 报错）
      dts: 'src/auto-imports.d.ts',
      // 可选：支持 ESLint 全局变量
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
    }),
  ],
})
