# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个演示项目，展示如何使用 Claude Code 的命令系统进行终端开发。项目主要包含命令示例和说明文档。

## 项目结构

```
commands/
├── readme.md          # 项目说明文档，包含 /init、/write、/explain 命令的使用示例
├── CLAUDE.md          # 本文件，为 Claude Code 提供项目指导
└── *.js               # 演示代码文件（如 email_validator.js）
```

## 开发指南

### 命令示例

1. **/init** - 初始化新项目
   - 用途：从零生成完整项目结构、配置文件和基础代码
   - 示例：`/init 用Node做一个控制台TODO项目，支持增删改查，用JSON文件存储数据`

2. **/write** - 生成指定代码
   - 用途：精准生成函数、类或完整文件
   - 示例：`/write 生成一个node函数，名为is_valid_email，参数是email字符串，用正则表达式验证格式是否合法`

3. **/explain** - 代码逐行解释
   - 用途：详细解释代码逻辑，适合新手学习
   - 示例：`/explain 把下面的代码逐行解释，用新手能听懂的话`

### 代码风格

- 使用中文编写文档和注释
- 代码简洁易懂，适合新手学习
- 使用 2 空格缩进
- 优先使用 async/await 处理异步操作
- 变量命名使用 camelCase
- 常量命名使用 UPPER_SNAKE_CASE

### 安全要求

- 禁止在代码中硬编码密钥或敏感信息
- 所有 API 调用必须使用 HTTPS
- 用户输入必须经过验证和清理
- 日志必须排除 PII（个人身份信息）
- 数据库连接必须使用加密传输

### 技术栈

- Node.js（用于演示项目）
- JSON 文件存储（用于数据持久化）
