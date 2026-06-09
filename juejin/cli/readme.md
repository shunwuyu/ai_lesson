[source](https://juejin.cn/book/7639017024882278440/section/7639017024782434339)

## 先用 50 行 TypeScript 代码搭建一个最小可运行的智能体（Agent）
让模型从「能回答问题」到「能实际执行操作」, 所依赖的是模型外面包裹的一层工程系统。

- 它在终端中的实际形态
- 如何接收自然语言
- 如何决定调用哪个工具
- 如何将结果流式输出给用户

这层系统负责驱动模型多轮调用工具、在终端中流畅渲染输出、在出错时自动恢复、在遇到危险操作时拦截确认。这层系统的质量，直接影响一个 Agent 能否从「能运行」走向「敢交给用户使用」。

## 依赖
typescript 为项目引入 TypeScript 编译器，支持 TS 语法和类型检查；
@types/node 为 Node.js 内置 API 提供 TypeScript 类型定义
tsx 基于 esbuild 快速直接运行 TS 文件的 CLI 工具
ai Vercel 官方 AI 开发 SDK，统一对接 OpenAI、Claude 等大模型
@ai-sdk/deepseek 适配 Deepseek 模型
zod 提供类型校验功能，确保输入参数符合预期格式

你运行 npm start → 调用 tsx → 用 TypeScript 做类型检查 → 用 @types/node 提供 Node 类型 → 直接运行你的 TS 文件。

- ts 不能直接运行，需要通过 tsx 调用
- 调用 typescript 编译ts 文件
- 如果用到了@types/node 提供的类型

## demo
- npm run build 
- npm run dev @types/node