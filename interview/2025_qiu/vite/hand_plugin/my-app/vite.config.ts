// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Components from 'unplugin-react-components/vite';
import { AntdResolver } from 'unplugin-react-components';

export default defineConfig({
  plugins: [
    react(),
    Components({
      resolvers: [
        AntdResolver({
          // ❌ 关闭自动样式引入，避免路径错误
          importStyle: false, // 👈 关键
        }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
});