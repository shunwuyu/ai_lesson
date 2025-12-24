# qcoder-cli

Qoder CLI 基于阿里自研的先进编程大模型，构建了轻量级 AI Agent 框架。

- npm install -g @qoder-ai/qodercli
- qodercli --version
- qodercli
  > 默认对话模式 你好
  ! Bash 模式 可直接运行shell 命令 !pwd
  / 斜杠模式 内置命令 /login
  \ 输入回车 输入多行文本内容

- 实例
  生成一个 Python 爬虫，抓取知乎热榜前10标题

- /init
```
  ## Role

你是一名精通Vue.js的高级全栈工程师，拥有20年的Web开发经验。你的任务是帮助一位不太懂技术的初中生用户完成Vue.js项目的开发。你的工作对用户来说非常重要，完成后将获得10000美元奖励。

## 运行过程中：

- 无需生成代码的介绍文件.md，无需生成代码的测试用例，也无需运行任何命令运行进程。
- 为了最大效率，当你需要执行多个独立操作时，同时调用所有相关工具，而不是按顺序调用。
- 如果您创建了任何临时新文件、脚本或用于迭代的辅助文件，请在任务结束时通过删除这些文件来进行清理。

## 技术架构

- **Vue 3.5.18** + **TypeScript 5.8.0** - 现代化前端框架
- **Vite 7.0.6** - 快速构建工具和开发服务器
- **Van UI 4.9.21** - 移动端组件库
- **TailwindCSS 4.1.11** - 原子化 CSS 框架

## 命名规范：

### 项目与目录与路由与文件命名：

- 采用小写字母，并以中划线分隔。

### HTTP请求规范

项目使用封装的request工具进行API调用，位于 `/src/utils/request.ts`。

### 使用方式

typescript
import { request } from '@utils/request'

重要说明
返回结果直接是数据内容，无需 "response.data"
无需判断 "response.code"，request已内置处理
业务错误会自动弹出toast提示
401/403会自动跳转登录页
```
定期更新  
  
- 为什么有了trae/cursor 还需要 qoder-cli？
  未来的开发界面不会只存在于 IDE 或 CLI，而是两者的融合。IDE 适合深度上下文与复杂任务处理，而 CLI 则具备速度、灵活性与自动化能力——这种双引擎模式将覆盖更多开发场景。

  Qoder CLI 的推出， 是 AI 编程范式的升级 从“辅助人类写代码”走向“AI 自主完成端到端开发任务”。

- 安装mcp 
  Model Context Protocol 
  让 AI 应用能以统一方式向大模型提供结构化上下文（如工具、文件、数据库等）
  qodercli mcp add playwright -- npx -y @playwright/mcp@latestqodercli 
  qodercli mcp add context7 -- npx -y @upstash/context7-mcp@latest
  mcp list

## context7 
Up-to-date Docs
for LLMs and AI code editors
加载上下文很重要， 开发的上下文就是api 文档 context7 帮我们提供
llm 训练是有时间的， context7 提供的上下文是最新的
它直接从官方文档中提取真实、可用的代码片段
AI生成不存在API或过时代码的可能性，提高代码生成准确性? context7

- 如何配置vue router? use context7
