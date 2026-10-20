# Pi 

## Pi Durable是什么？

**Pi 是一个极简开源、运行在终端的编码 Agent 框架，仅内置读写改文件、执行命令 4 个基础工具，能力通过扩展按需增加**
**核心极简、模型无关、高度可定制，开发者可以让 Agent 适配自己的工作流，而不是反过来**。

DeepSeek Harness 是 DeepSeek 推出、一切皆插件的开源智能体运行框架，负责给模型提供沙箱、工具调用、会话追踪等整套执行能力。

npm install -g --ignore-scripts @earendil-works/pi-coding-agent

- Pi：系统提示 + 4 个基础工具 schema，**≈800–1000 token 固定打底开销**，不加额外工具就不再多带 schema
- Codex CLI：精简版基线 **≈1700–1900 token**，完整版可达 **≈6000 token**；开启 MCP 插件后很容易冲到上万 token，工具 schema 一次性全载入，不用也占 token 税

只需要一美元就能帮你跑完大型爬虫的开源神器， 硅谷极客圈都在安利一个开源终端
Agent AI + DeepSeek 省钱神器。






10.1 Pi 发布了Pi Durable（实验性的框架）, Code Mode、MCP、延迟加载工具正式。

- 是什么？
实验性的npm 包， durable（持久） Agent harness （可靠）
构建各种Agent应用的框架。

- harness
  一份存储 + 运行会话的机制
  可以并行运行多端大模型会话所需的那套机制
  提供模型调用的工具
  以及工具运行的执行环境

- 接口
1. 打开、恢复

指定一个存储 比如SQLite 文件， 会话记录和任务进度都写进去；重启后用同一份存储重新打开，
接着跑， 存储放在哪里， 有你的代码决定。

- 2. 管理会话， 创建会话， 或者从任何一条记录分叉处一段新会话。

- 3. 提交和等待。 

- 4. 单独配置模型

- 5. 扩展

- 6. 应用状态

- 7. 订阅

- 8. 存储于执行环境

read + write + edit + bash(执行命令) = 一个Coding Agent

- 可以做什么？

1. 长时间运行的Agent 
几分钟， 几个小时
中途崩溃了， 机器重启了， 都能从断点继续

2. 聊天平台里的Agent 

3. 多个共用协作的Agent

4. subagent 应用
  subagent可以用更便宜， 更有针对性地模型，只读的工具

5. 业务状态
订酒店， 买火车票

6. 后台自动化
定时提醒 

官方demo 终端coding agent, 度假规划agent 就是用这些接口搭建的

## Pi 和 Pi Durable 区别
Pi 是一个人在终端里用的coding agent 
- 能在任何地方运行
- 能从不同的界面接入
- 会话可以无限长
- 扛得住内外部的严重故障
- 多人同时操控同一个Agent

Pi Durable 是harness, 是构建各种Agent应用的框架

15万token , 大模型可以很轻松读懂它。



