# nextjs 

# 创建项目
npx create-next-app@latest todo-app --typescript --tailwind --eslint

# 安装 shadcn-ui
npx shadcn-ui@latest init

# 安装需要的组件
npx shadcn-ui@latest add button input card


Next.js 是一个基于 React 的全栈开发框架，提供服务端渲染(SSR)、静态生成(SSG)、文件路由、API 路由等功能。

- 服务端渲染(SSR)
服务端渲染(SSR)是在服务器生成完整的 HTML 页面再发送给浏览器，可以提高首屏加载速度和 SEO 效果。

- 静态生成(SSG)
静态生成(SSG)在构建时预先生成静态 HTML 页面，访问时直接返回，具有超快的加载速度和极佳的 SEO 表现。


异步组件在服务器端获取数据并渲染HTML，有利于SEO和首屏加载；客户端组件在浏览器端执行，适合交互性强的功能，如表单提交和状态管理。