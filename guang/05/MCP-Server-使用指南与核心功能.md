# MCP Server 使用指南与核心功能总结

## 一、MCP 是什么？

**Model Context Protocol (MCP)** 是一套**开放标准协议**，用来把 AI 应用（如 Claude、Cursor、ChatGPT）和外部系统连在一起。

- 可以理解为：**AI 的“统一接口”**（类似 USB-C 对各种设备的作用）。
- 通过 MCP，AI 能连接**数据源**（文件、数据库）、**工具**（搜索、计算）、**工作流**（预设提示/任务），从而获取信息并执行操作。

---

## 二、MCP Server 的三大核心功能

MCP Server 通过三类能力对外提供服务，对应三种“谁在控制”的模式：

| 能力 | 说明 | 控制方 | 典型用途 |
|------|------|--------|----------|
| **Tools（工具）** | 可被模型**主动调用**的函数 | **模型控制** | 搜航班、写文件、调 API、查数据库 |
| **Resources（资源）** | 可被**读取**的类文件数据 | **应用控制** | 读文档、知识库、日历、配置 |
| **Prompts（提示）** | 预设的**任务模板/指令** | **用户控制** | 规划行程、总结会议、写邮件模板 |

### 1. Tools（工具）

- **定义**：供 LLM 在对话中按需调用的函数。
- **特点**：模型根据用户意图**自动发现并调用**；通常需要用户批准或可见（安全考虑）。
- **协议**：客户端用 `tools/list` 发现工具，用 `tools/call` 执行。
- **例子**：文件读写、高德路线规划、查用户信息、浏览器操作等。

### 2. Resources（资源）

- **定义**：只读的、类文件的数据源，给应用/模型提供上下文。
- **特点**：**被动、只读**，不直接修改外部状态。
- **控制**：由**应用程序**决定何时读取、读哪些资源。
- **例子**：文档内容、知识库条目、日历事件、API 返回的只读数据。

### 3. Prompts（提示）

- **定义**：预置的提示模板，告诉模型“用什么方式、做什么任务”。
- **特点**：**用户主动选择**（如斜杠命令、按钮），不自动执行。
- **用途**：引导工作流、组合多步操作、标准化任务（如“规划假期”“总结会议”）。

---

## 三、常见使用方式（连接 MCP Server）

### 1. 传输方式

- **stdio**：本地进程，通过标准输入/输出与 MCP 客户端通信（如 Cursor、LangChain 本地起子进程）。
- **HTTP/SSE**：远程访问，通过 URL 连接（如高德 MCP 的 `https://mcp.amap.com/mcp?key=...`）。

### 2. 在 Cursor 里用 MCP

- 在 Cursor 设置中配置 MCP Server（如 `mcp.json` 或项目内配置）。
- 配置里写清 `command` + `args`（stdio）或 `url`（HTTP）。
- 配置好后，AI 可自动使用该 Server 暴露的 **tools / resources / prompts**。

### 3. 在 LangChain 里用 MCP

- 使用 **@langchain/mcp-adapters** 的 `MultiServerMCPClient`。
- 在 `mcpServers` 里配置多个 Server（高德、filesystem、chrome-devtools 等）。
- 用 `getTools()` 拿到所有工具，再 `model.bindTools(tools)` 绑定给模型，即可在 Agent 中调用。

---

## 四、设计要点（为什么这样设计）

- **标准化**：同一套协议，不同客户端（Cursor、LangChain、Claude Desktop 等）都能接同一批 Server。
- **安全与可控**：工具调用可配合日志、权限、用户确认；Resources 只读；Prompts 由用户触发。
- **生态**：开发者只需按 MCP 规范实现 Server，即可被多种 AI 应用复用（“一次开发，多处使用”）。

---

## 五、一句话总结

**MCP Server 的核心功能**：通过 **Tools（模型可调用的函数）**、**Resources（只读数据源）** 和 **Prompts（用户选择的提示模板）** 三种能力，把外部数据和操作标准化地暴露给 AI 应用，让模型能安全、可控地使用你的数据和工具。

---

## 参考

- 官方：https://modelcontextprotocol.io  
- 规范与概念：https://modelcontextprotocol.io/docs/concepts/  
- 中文社区/文档：mcpcn.com、modelcontextprotocol.info/zh-cn
