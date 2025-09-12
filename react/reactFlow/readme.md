# ReactFlow

- AI 工作流编排器（AI Agent 编排）
[监听邮箱] → [用 AI 分析邮件情绪] → [生成回复草稿] → [人工审核] → [发送邮件]

- Coze
每个方框是一个 Node（节点）
箭头是 Edge（边）
用户可以拖拽节点、连接它们、配置每个节点的参数
后台将这个“图”保存为 JSON，运行时按顺序执行

<Node type="input" label="监听邮箱" />
<Node type="llm" label="AI 分析情绪" />
<Node type="output" label="发送邮件" />
<Edge source="node1" target="node2" />

- 低代码编辑器
低代码是一种通过可视化拖拽、配置等方式快速搭建应用的开发模式，让不懂编程的人也能像拼积木一样做出软件系统。

## React Flow
React Flow 让你用 React 的方式，像搭积木一样构建任何“可视化流程”应用，是开发 AI Agent 编排器、低代码平台等复杂交互系统的利器。

- 基本案例
- 添加结点


## supabase 保存

```sql
create table flows (
  id uuid default gen_random_uuid() primary key,
  name text,
  nodes jsonb,
  edges jsonb,
  created_at timestamp default now()
);
```

