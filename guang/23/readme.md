# Agentic RAG: 基于LangGraph实现大模型自主决策的RAG闭环系统

公司内部的Agent基本都用RAG。

大模型能思考， 但不知道公司内部的文档， 而我们需要他能基于内部文档来回答。

这个流程太固定， 会有一些问题：

- 所有问题都走检索， 其实简单常识类问题不需要检索， 浪费资源
- 没有纠错和评估机制，无法判断检索内容是否准确，是否足够
- 处理不了需要多不检索的复杂问题， 比如先查A、再查B才能得出结论
- 专业术语、精确实体更适合关键词检索， 纯语义检索容易匹配不准
- 本地知识库没有的内容， 不会主动去网络搜索补充， 容易编造答案。

解决这些问题，显然要在 RAG 的固定流程中，引入大模型来思考。

- 让模型根据问题类型选择检索策略，简单问题直接回答，复杂问题才走完整检索
- 评估检索结果是否相关、是否足够，让模型判断是否需要重新检索或补充检索
- 让模型自动拆解复杂问题，决定先查什么、后查什么，实现多步检索
- 同时结合关键词检索与语义检索，由模型统一融合多路结果，提升专业场景准确率
- 让模型判断本地知识库是否覆盖答案，覆盖不足时自动触发网络搜索补充信息

最终把原本 “死板的检索‑生成” 流程，升级为可思考、可判断、可纠错的智能 RAG 架构。

这种由大模型自主决策怎么检索、检索的信息是否足够、是否要重新检索等的 RAG 流程就叫 Agentic RAG。

这种适合用LangGraph 的多Agent 架构来做， 每个Agent 负责其中一块功能。


## LangGraph

LangGraph 是把 AI 流程画成流程图来跑的框架：每个节点（检索、生成）是工作台，连线是流转规则，能循环、能条件分支、能随时停下接着跑，比一条 prompt 走到底灵活得多。配合 LangChain 用，适合搭 RAG、多 Agent 这类复杂应用。

- Annotation.Root
声明图的状态字段（工作单格子）
- addNode("名字", 函数)
加工作台：每个节点是一个函数，收状态、返回新状态
- addEdge(from, to)
连固定线：A 跑完必去 B
- addConditionalEdges
连智能线：根据返回结果决定下一步去哪个节点
- START / END
图的起点和终点
- compile()
把图编译成可执行对象
- invoke(input) / stream(input)
跑整张图 / 逐步流式看每个节点的输出
```
const graph = new StateGraph(GraphState)
  .addNode("retrieve", retrieveDocs)
  .addNode("generate", generateAnswer)
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", END)
  .compile();

const result = await graph.invoke({ question: "什么是RAG" });
```