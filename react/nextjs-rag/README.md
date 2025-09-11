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

- ai-sdk 
ai/react 库通过 useChat() 提供了对流式输出（streaming）的原生支持，极大简化了实时 AI 响应的实现。它自动处理 SSE 连接、增量更新消息流，并在 React 中安全地更新状态，开发者无需手动管理事件监听或拼接文本，只需渲染 messages 即可实现逐字输出效果，大幅提升开发效率与用户体验。
useChat
这行代码是用 useChat() 这个工具，一次性拿到聊天要用的各种功能：比如用户输入的内容（input）、输入框变化的处理函数（handleInputChange）、发消息的函数（handleSubmit），还有所有聊天记录（messages）和当前状态（status），特别方便，一行搞定一堆事

- react-markdown 是一个 React 组件库，能将 Markdown 格式的文本自动渲染成美观的 HTML 页面，支持自定义样式和扩展语法，非常适合展示博客、文档等内容。

- AI SDK 让调用大模型更简单，一行代码实现流式输出、自动分块、工具调用，不用手动处理请求和解析数据，专注业务逻辑，像聊天、生成内容轻松搞定。

- supabase.rpc() 是调用数据库中预定义函数（如向量搜索）的方式，让前端安全地执行复杂查询，比如“找出与用户问题最相关的知识片段”。

- rpc 
  ```sql

  //这段 SQL 代码在 Supabase（基于 PostgreSQL）中创建了一个名为 `get_relevant_chunks` 的函数
  create or replace function get_relevant_chunks(
  query_vector vector(1536), 查询文本的嵌入向量
  match_threshold float, 相似度阈值（例如 0.5），只有高于此值的结果才被返回
  match_count int 最多返回多少条匹配结果
)
returns table ( 该函数返回一个结果表
  id uuid, 文本块的唯一标识
  content text, 原始文本内
  url text, 内容来源链接 
  date_updated timestamp, 最后更新时间
  similarity float 与查询向量的余弦相似度
)
language sql stable
as $$
  select
    id,
    content,
    url,
    date_updated,
    1 - (chunks.vector <=> query_vector) as similarity
  from chunks
  where 1 - (chunks.vector <=> query_vector) > match_threshold
  order by similarity desc
  limit match_count;
$$;
  ```
