# 图编排引擎：LangGraph 和多 Agent 架构

复杂的Agent 产品基本都是多Agent架构的。 

图 1

单 Agent 架构下，所有 tool 的描述、每个功能的 prompt 都放到 system prompt 里。

实际上执行每个功能只需要其中一部分 prompt，但每次都全带上。

这样会导致 token 消耗更高，更重要的是很多无关信息干扰，思考效率低还更容易出错。

而如果你拆分成多个 Agent 呢？

图2

每个 Agent 只保留需要的 prompt，执行功能的时候，消耗的 token 更少，没有无关信息干扰，准确率也更高。

再就是单 Agent 只有一个大脑，需要一步步思考，调用 tool

图3 


还有，单 Agent 虽然可以加上反思阶段，但相当于自己给自己纠错

而多 Agent 每个都是不同的角色，可以互相讨论纠错

现在复杂 Agent 产品基本都是多 Agent 架构的。

实现 Multi Agent 就需要学习 LangGraph 了。

用到的 api 还是 LangChain 那些，但它多了一套图编排引擎。

## 图编排引擎

```
pnpm i @langchain/langgraph @langchain/core @langchain/openai dotenv zod
```
图4 coze 工作流 用langgraph 做的

安装 markdown preview mermaid support 

a.md 

```mermaid
```

## 图

分支和循环。




