---
name: web-research
description: 结构化多来源联网调研，支持并行委派调研员子 Agent
---

# 联网调研技能

当用户要求调研、调查、对比或深度分析某个主题时使用本技能。

> **注意**：本技能是主 Agent 的流程指南，不是子 Agent。联网搜索请委派 `researcher` 子 Agent，**不要**将 `web-research` 作为 subagent_type 调用。

## 流程

### 1. 规划

1. 将用户问题写入 `/workspace/sources/question.txt`
2. 创建 `/workspace/sources/research_plan.md`，包含（**中文撰写**）：
   - 主调研问题
   - 2–4 个互不重叠的子主题
   - 每个子主题的预期产出
   - 综合策略

### 2. 委派（可并行）

对每个子主题，用 `task` 工具启动 **researcher（调研员）** 子 Agent：

```
调研【具体子主题】。可用 write_todos 列出最多 3 条中文步骤（可选）。
使用 web_search 搜索（最多 10 次，关键词用中文）。
将 findings 保存到 /workspace/sources/findings_[子主题slug].md，写入后结束。
```

子主题相互独立时，最多并行 3 个调研员。**总数不超过 3 个。**

### 3. 综合

1. 读取所有 `/workspace/sources/findings_*.md`
2. 整合为连贯分析
3. 定稿前委派 **editor（编辑）** 子 Agent 审阅

## 最佳实践

- 委派前必须先写 research_plan.md
- 每个调研员只负责一个聚焦子主题
- Agent 之间通过文件传递信息，不要依赖对话历史
- 搜索关键词优先使用中文
