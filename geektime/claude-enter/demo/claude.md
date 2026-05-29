## 项目概述

Hify 是一个简版的 AI Agent 开发平台（参考 Dify），可本地部署，
面向团队内部小规模使用（20-50 人同时在线）。

### 做什么
- 多模型提供商管理（OpenAI、Claude、Gemini、Ollama）
- Agent 创建与配置（选模型、绑工具、设系统提示词）
- 对话引擎（流式响应、多轮对话、上下文管理）
- 知识库 + RAG（一期只支持 TXT 文档，固定长度分块）
- 简版工作流（JSON 配置，线性 + 条件分支，不做可视化拖拽）
- MCP 工具接入（Agent 可通过 MCP 协议调用外部工具）
- 管理控制台（模型管理、Agent 配置、对话界面）

### 不做什么
- 不做可视化工作流拖拽编排
- 不做多租户 / 权限体系
- 不做插件市场、计费系统
- 不做文本生成应用、WebApp 发布、嵌入组件
- 不做标注与微调

### 技术栈
后端：Spring Boot 3.x + MyBatis-Plus + MySQL 8.x + Redis 7.x
前端：Vue 3 + TypeScript + Vite + Element Plus
容器化：Docker + Docker Compose

### 部署与运维预期
- Docker Compose 本地一键部署，JVM 内存设上限（-Xmx512m）
- 目标：20-50 人同时在线，峰值 3-5 QPS，瓶颈在 LLM 长连接
- 缓存：Redis Cache-Aside（配置信息 + 会话上下文）
- 监控：起步 Actuator + 日志，后期 Prometheus + Grafana

### 提前想清楚怎么跑

很多人做项目只想功能，不想运维。功能做完了往服务器上一扔，等出问题了才发现很多事没有提前想。

Hify 是一个 AI Agent 平台，Docker Compose 本地部署，目标 20-50 人同时在线，主要压力在对话接口（流式 SSE）。帮我估算 QPS、建议缓存策略、列出需要提前考虑的运维事项。

Docker Compose 是用一个YAML 配置文件一键启动、管理多个关联容器（如 SpringBoot、MySQL、Redis、向量库）的工具，本地一行命令就能跑起整套 Hify 环境。

QPS：Queries Per Second
每秒请求查询次数，衡量接口、服务每秒能承载的访问压力。

建议缓存策略 redis 

1. QPS 极低，瓶颈不是并发。50 人在线，活跃率 60%，每人每分钟 2 条消息，峰值也就 1 QPS，加上 RAG 检索等内部调用放大 3 倍，也就 3-5QPS。Spring Boot 单实例轻松应对。真正的瓶颈是 LLM 响应延迟（3-30 秒 / 次）占用连接——这不是 QPS 问题，是长连接管理问题

2. SSE 长连接是唯一需要认真对待的压力点。50 个并发 SSE 连接，每个持续 10-30 秒，意味着 50 个线程被长期占用。Spring Boot 默认 200 线程够用，但要注意：用 SseEmitter 不要用普通 ResponseBody 阻塞线程，设 60 秒超时防止僵尸连接，Nginx 反向代理缓冲（proxy_buffering off）否则流式数据会被攒批再发。这几个坑我自己没全想到，尤其是 Nginx 缓冲那个——不关的话用户看不到打字机效果，要等 LLM 全部输出完才一次性吐出来。

proxy_buffering 开启：Nginx 攒数据，流式变一次性加载
关闭：数据直通转发，实时流式输出

- 缓存策略简单直接。模型提供商配置和 Agent 配置变更频率极低，用 Redis 缓存。LLM 响应不要缓存——同一问题不同时间答案可能不同。对话历史直接读数据库，50 人规模数据量小，缓存收益不大。

- 数据持久化是硬性要求。MySQL 数据目录、向量数据库数据目录、上传的文档文件