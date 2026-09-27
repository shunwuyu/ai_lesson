# DeepAgents 开箱即用的Skill, 上下文压缩等middleware

我们学了 LangChain、LangGraph，可以基于它们实现各种 Agent。

但如果想做一个复杂的 Agent，全部从头自己实现还是比较麻烦。

有没有基于 LangGraph 再封装一层，也就是半成品的 Agent 框架呢？（nestjs 例子）

有的，就是 **DeepAgents**。

LangChain 是给你一堆 AI 开发积木，LangGraph 是搭建复杂工作流的**底层蓝图**，那 DeepAgents 就是提前搭好主体结构的半成品房子。

底层依赖 LangGraph 的状态管理（state）、循环路由（支持节点循环跳转）、持久化执行能力（checkpointer）（保存运行状态，中断后可恢复 Agent 执行），上层直接内置了任务规划、长期记忆、子 Agent 调度、上下文压缩等核心能力。

它最大的优势，就是大幅降低复杂 Agent 的开发门槛。

原生 LangGraph 适合极致自定义、底层深度开发。

DeepAgents 适合快速落地复杂 Agent 应用，比如深度调研、代码开发、多步骤业务执行、多智能体协作等场景。

它帮我们跳过重复的底层基建，直接聚焦 Agent 的业务逻辑与能力迭代，是 LangGraph 生态里面向生产落地的高阶封装方案。

可以在 agent 运行前后、model 调用前后加一些逻辑，以及控制 model 要不要调用，可以提前结束流程

- npx skills add https://github.com/github/awesome-copilot --skill excalidraw-diagram-generator

调用 Excalidraw 生成草图风格图表的 GitHub Copilot 技能工具
