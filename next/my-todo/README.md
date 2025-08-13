# next

- npx create-next-app@latest my-todo
- CSR OR SSR
    看html
    CSR（客户端渲染）指的是页面的JavaScript在浏览器端运行，动态获取数据并更新DOM，适合交互性强的应用但首屏加载慢。SSR（服务器端渲染）则是由服务器生成完整的HTML页面发送给浏览器，提升首屏加载速度和SEO效果。SSR的优势在于能加快网页初始内容的呈现速度，改善用户体验，并有利于搜索引擎优化，对于内容驱动型网站尤为重要。此外，SSR减轻了客户端的计算负担。

- TypeScript 基于ts
- Tailwind CSS
- App Router
    Next.js App Router 是一个基于文件路由的架构，允许开发者通过在 app 目录下组织文件和文件夹来定义应用的页面和布局，并支持服务端渲染、静态生成和客户端交互等特性。
    - page.tsx
    - about.tsx
        page2.tsx
        page.tsx
        app/config.ts
        根目录 .env.development
        .env.production  
        npm run build 
        npm start 切换看值
- layout 
    components/app-header.tsx
- posts 模块
    data/posts.json 假数据
    lib/api.js
    posts/[id]
- repos 模块