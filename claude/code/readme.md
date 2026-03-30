[source](https://www.bilibili.com/video/BV1k1bBzTEF5/?spm_id_from=333.337.search-card.all.click&vd_source=3d50341f547faf8df242a214b04f2d86)

- 过去几年里AI 辅助编程发展非常迅速
    - 最开始我们是在百度/Stack Overflow
    - github copilot 自动建议/完成代码
    - trae/cursor 越来越智能和自主（builer 模式）
    - claude code 在自主性和编程助手能独立完成的任务量上大的提升。
        指标： 让claude 执行一个任务数分钟， 甚至更长
        不只是单个Cloude实例，让多个实例并行处理代码库的不同部分。
        要协调这些操作，其实有一套并不广为人知的最佳实践

- 为什么有了cursor等AI编辑器，还需要Claude Code
    Cursor 是 AI 编码 IDE，轻量实时辅助开发；Claude Code 是终端智能Agent，长上下文擅复杂工程重构。显著提升AI 工程化能力。
    - claude code 去年下半年
        cursor 23年3月
    - windows 和linux, 有些任务适合在终端里面跑。
    Claude Code更像“智能终端助手”，适合在CLI中完成复杂脚本生成、日志分析、批处理任务编排及多步骤自动化流程；可直接结合shell完成系统级操作与推理，而Cursor主要局限在IDE内，对纯命令行驱动的开发与运维场景支持较弱。

- Claude Code 与 OpenClaw
    Claude Code 是专精于代码开发的终端专家，而 OpenClaw 是覆盖全场景的自动化管家。

    OpenClaw 模型无关, 持久记忆(养虾)， 生态开放（SKILLS）作为开源框架，支持通过插件无限扩展技能，实现办公、生活等任务的自动化。

    两者的编程能力比较

    OpenClaw 可以变成程序员，但它需要你自己去“调教”；而 Claude Code 生来就是资深工程师。

- Claude Code A Highly Agentic Coding Assistant.
- 极大的提升了开发者的工作效率，这是一款功能非常丰富的工具
- 这个工具是什么，他是怎么工作的 一直到如何与多种工具并行使用。
    - cursor + claude code 
    Cursor (可视化编辑器) 作为“前端”和“架构师”。你用它来浏览代码、进行微调、查看 UI 效果，以及处理需要人工精细干预的逻辑。
    Claude Code (终端代理)：作为“后端”和“苦力”。你在终端里下达宏观指令（如“重构整个认证模块”或“修复所有类型错误”），让它在后台自主运行、生成代码、运行测试。
    并行效果 两者互不干扰但共享同一套代码库。

    - Claude Code  +  Codex
    Claude Code：负责编写代码、实现功能。
    Codex：作为“代码审查员”。Claude Code 提交代码后，自动调用另一个 AI 模型的命令行工具进行 Review，查找逻辑漏洞或性能瓶颈。
    并行效果 如果审查不通过，Claude Code 会根据反馈自动修改，直到两个 AI 达成一致，实现无人值守的高质量交付。

    - 利用 Shell 的管道能力，Claude Code 可以与任何命令行工具并行
    Git：claude "分析当前变更并生成 Commit 信息"，直接接管版本控制。


- 使用Claude code 的关键技巧是提供一个清晰的上下文、代码指向相关文件，详细描述你需要的功能和特性。
并正确使用MCP Servers, SKILLS, 
- RAG chatbot
    丛前端到后端逐步实现相关功能
    包括重构代码，编写测试，使用github 集成 处理拉取请求并修复问题。
- 使用很多功能，包括规划(planning)、思维方式(thinking model)、创建并行会话等 管理cluade memory
- 第二个例子 我们将使用jupter notebooks 来分析电商数据
    使用claude code 重构 jupter notebooks，去除冗余代码，通过Web应用创建强大的数据仪表盘

- 最后的例子，我们将在Figma中创建可视化模型，连接Figma MCP 服务器，以及另一个MCP 服务来导入设计，迭代，测试并以智能方式构建强大的前端应用。

- 终端环境 理解项目结构、执行操作并提出建议
1. 原生终端支持
代码生成、调试、执行命令等操作


- 安装 npm install -g @anthropic-ai/claude-code
- export ANTHROPIC_BASE_URL="https://api.moonshot.cn/anthropic" && export ANTHROPIC_AUTH_TOKEN="sk-BnAXwRJefE0LcV8dBBXvvLd1CG3Pw7pMYzgYtm5u1XQcgtZK"
