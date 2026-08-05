# Next.js

Next.js 是 流行React 全栈框架。

```
npx create-next-app@latest my-todo2
```

create‑next‑app@latest 是 Next.js 官方脚手架命令，一键生成最新版本 Next.js 项目模板。

- npm run dev
   右键搜索
   npm init vite  搜不到
  来自vercel 的 next‑js支持 ssr（Server Side Rendering 服务端渲染，优化 seo）， 原生对 SEO 更加友好，所以现在很多新的内容站点、门户网站以及商业落地页站都使用 next.js 开发。

- 目录的意义

app/page.js：访问根路径 / 渲染这个页面。
app/api/todos/route.js：API 端点，前端可以 fetch('/api/todos') 调用。