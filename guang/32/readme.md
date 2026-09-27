# LangSmith 全链路观测： 从Agent调试到RAG量化评估

我们学了基于 LangChain、LangGraph 开发 Agent，但总有一种强烈的 “盲盒感”。

现在可以看到终端不断流出的 Token，但是：

它调用了哪个工具？每一步耗时多少？消耗了多少 token？

而且，当你试图复现那个偶尔出现的 Bug 时，它又消失了。

软件工程界有一句名言：“如果你无法度量它，你就无法管理它。”

所以我们要给 Agent 加上全生命周期的可观测性。

这就是 LangSmith。

如果说大模型是引擎，那么 LangSmith 就是那个不可或缺的仪表盘。

https://smith.langchain.com/

- 免费版， 每月 **5000 条 trace 追踪**，单用户席位，完整可观测、调试、评测功能，学习 Agent 开发完全够用LangSmith
- **Plus 团队版**：39 美元 / 每人每月，每月 10000 条 trace，支持多人协作；企业版自定义报价LangChain
- 面板
  - trace 追踪单次agent 运行的详细信息
  - monitoring 整体运行情况的统计
  - datasets 可以放一些数据集
  - evaluators做评估的
- 获取API Key

## trigger-error.mjs
根据.env 自动带上 LangSmith 配置 自动提交。

## Dataset

除了日常监控观测之外，我们还需要对业务效果做标准化评估。

这时候就可以使用 LangSmith 的 Dataset 功能，也就是测试样本，统一存放用户提问和标准答案。

搭建好数据集后，再通过 Evaluation 设定打分规则，批量完成自动化评测，精准衡量回答质量，用量化数据来优化 Agent 和 RAG 相关业务逻辑。

我们写个 rag 的 agent 案例：


