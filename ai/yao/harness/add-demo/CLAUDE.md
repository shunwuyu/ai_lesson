# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

本项目是 Harness 四层架构中的记忆层（Memory Layer）案例。CLAUDE.md 本身即记忆载体，描述了待生成工具——一个极简 Node.js 加法工具——的行为规范。后续 Claude Code 实例将依据此文件生成符合规格的代码。

# 项目规则 - 极简Node加法工具
## 1. 技术栈
语言：Node.js 原生JS，仅内置模块，不许引入第三方npm包
## 2. 目录规范
入口文件：index.js，所有代码写在该文件，不拆分文件
## 3. 代码要求
1. 函数必须加单行注释，代码极简，拒绝冗余
2. 输出结果用console.log清晰打印
3. 必须提供调用示例
4. 新增函数使用ES6箭头函数
## 4. 输出约定
写完代码后，附带运行命令：node index.js