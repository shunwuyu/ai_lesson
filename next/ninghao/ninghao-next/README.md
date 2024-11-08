- git clone https://github.com/ninghao/ninghao-next-w22-starter.git ninghao-next
- pages/index.tsx 新增 
- 右键 源代码  可以看到ssr 内容
- about.tsx
- head.tsx 调整了目录为 app目录
- about/head.tsx 为about 加head 
- 布局 layout.tsx
- styles 目录
  public/styles/app.css global.css 移到这里
  layout.tsx 引入 样式
  app.css 改为app.module.css
- 将 header 组建移到 components/app-header.tsx
  layout 修改
- .env 
  app/config.ts
- 不同环境
  .env.development
  .env.production
  config.ts
  about

  npm run build
  npm run start
