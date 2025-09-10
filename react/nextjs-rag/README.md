- npx create-next-app@latest nextjs-rag --yes
- npx shadcn@latest init
  npx shadcn@latest add button
-   pnpm add lucide-react
  lucide-react 是一个轻量、开源的 React 图标库，提供大量简洁美观的 SVG 图标，支持按需导入和自定义大小、颜色等属性。
- 第三方动画库 tw-animate-css 第三方动画库
- @plugin "@tailwindcss/typography";
  详情页用
  @plugin "@tailwindcss/typography" 用于自动美化 HTML 内容的排版样式，如文章、博客中的标题、段落、列表等，让文本更美观易读。

  prose：应用默认的排版样式，包括字体、行高、字间距、段落间距等，使文本更易读。

  prose-lg：设置较大的字体大小和行高，适合正文内容，提升可读性。

  prose-blue：将链接、引用等元素的颜色主题设为蓝色，保持视觉一致性。

- layout.tsx 里设置下 metadata
  layout.tsx 中的 metadata 用于定义页面的标题、描述等 SEO 信息，会自动注入到 HTML 的 <head> 标签中。


- pnpm i ai@4.3.16 @ai-sdk/core @ai-sdk/react 
  ai 是一个用于构建 AI 流式响应和 Agent 功能的 JavaScript/TypeScript 库，它简化了与大语言模型（如 OpenAI、DeepSeek 等）的交互，支持实时流式输出、会话管理、工具调用（Tool Calling）和 React Server Components 集成，非常适合在 Next.js 等框架中开发聊天应用、AI 助手和智能代理。

  ai@4.3.16 是核心库，提供 AI 流式响应与 Agent 能力；@ai-sdk/core 是底层运行时逻辑；@ai-sdk/react 提供 React Hooks（如 useChat）以便在组件中便捷使用 AI 功能。

- 安装 langchain
  pnpm i @langchain/community langchain @langchain/core

  langchai 提供开箱即用的 AI Agent、链、提示词模板等高级功能，适合快速开发。
  @langchain/core 核心类型与抽象接口，
  @langchain/community：社区维护的集成插件库，包含大量第三方工具（如数据库、API），扩展 LangChain 能力

- ts-node 
  npm run seed
  ts-node 是一个让 Node.js 直接运行 TypeScript 文件（.ts）的工具，无需预先编译成 JavaScript。

- node 最新版本
  sudo npm cache clean -f
  sudo npm install -g n
  sudo n latest