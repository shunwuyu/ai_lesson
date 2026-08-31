# 旅行攻略助手

- 高德地图开放平台提供的 MCP Server
  mcp 配置
  API 探索
- ai coding 
- 旅游行业Agent

## 项目输出化
```
mkdir travel-plan-miniapp
cd travel-plan-miniapp
```

## 什么是高德 MCP

高德 MCP 于 2025 年 3 月首发，旨在为大模型在出行领域的应用落地高效赋能。为开发者提供一站式的出行服务能力。

钉钉 CLI 面向 AI‑Agent，一键接入钉钉办公能力。

AI 客户端调用服务能力
由 AI‑Agent 使用对应工具服务

## 产品架构

高德 MCP 的架构可以分为以下几个层级：

- AI 应用层
Codex, Claude Code 作为Host, 
高德地图Client

- MCP 服务
负责解析来自 AI 应用的请求，并将其分发给高德开放平台的各种原子能力。

- 高德原子能力
包括地图、搜索、定位、路线规划等一系列成熟稳定的 LBS 服务。

通过这种方式，开发者无需再为每个功能单独对接复杂的 API，只需通过统一的 MCP 协议，就能轻松调用高德强大的底层服务。





