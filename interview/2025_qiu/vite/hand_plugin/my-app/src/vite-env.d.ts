import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Components from 'unplugin-react-components/vite';
import { AntdResolver } from 'unplugin-react-components';

export default defineConfig({
  plugins: [
    react(),
    Components({
      resolvers: [AntdResolver()],
      dts: true, // 启用 TypeScript 类型声明自动生成
    }),
  ],
});
