# checkpoint fastapi
```
langgraph_demo_fastapi/
├── app.py              # FastAPI 入口，定义 REST API
├── graph.py            # LangGraph 图定义（节点 + 边 + checkpointer）
├── state.py            # AgentState 状态定义
├── nodes.py            # 节点函数（node1, node2, human_review, node4）
├── checkpointer.py     # SQLite Checkpointer 管理
├── schemas.py          # Pydantic 请求模型
├── requirements.txt    # 依赖列表
└── README.md           # 使用说明
```