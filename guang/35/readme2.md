# DeepAgents 实战： 多Agent 架构的深度调研助手

你只要给它一个主题， 它的主Agent 会自动规划任务，列出todo 列表， 然后交给
不同的子Agent 来执行任务， 比如联网搜索、代码执行等， 最后生成一份调研报告。

把大任务拆小，单个 researcher 只搞一块，还能多实例并行，调研更快更聚焦。

就是能跑 JS 代码的执行环境，给 analyst 用，输入 JS 表达式直接算，用来做数值计算、数据分析。

QuickJS REPL 就是**沙箱 JS 运行环境**，代码隔离执行，防止危险代码搞坏主程序，专门给 Analyst 跑计算。

## 3个子Agent


createDeepAgent 是 DeepAgents 的 API，快速搭建多 Agent，自带 todo 调度、记忆与上下文压缩能力。
我们基于 DeepAgents 的 createDeepAgent api 实现了深度调研助手。
这是一个多 Agent 架构的 agent
主 Agent 会列出 todo 列表，按步执行，具体的调研、数据计算分析、报告编辑，由三个子 Agent 负责，它们有各自的能力，比如网络搜索、沙盒执行代码
丢进**独立隔离沙盒容器**运行，和你的主机系统隔离
子 Agent 执行的时候，如果需要多个步骤，也是先列 todo 列表再执行，比如调研的时候。执行完更改 todo 任务状态。
Agents.md 的长期记忆、skill 执行等都是内置了，配置一下就行。
上下文压缩也是内置功能，可以修改 profile.maxInputTokens 来修改触发阈值。
这样，我们没有写很多代码，就完成了一个多 Agent 架构支持 skill 的功能比较完善的 Agent，这就是 DeepAgents 开发 Agent 的好处，有很多开箱即用的能力。

## Langchain LangGraph DeepAgent

三个框架有什么区别和联系？

官方定义：
同一套技术栈的不同层

## LangGraph

底层引擎， 一台发动机
管的是Agent 执行流程
掌握着最大控制权， 最小抽象
适合精细掌控的每个步骤

都在langGraph 层面搞定。 

## LangChain
上层框架 给了最简的Agent抽象(createAgent)
模型跑在循环里调工具
中间件机制 循环各节点加钩子
控制粒度比LangGraph 粗

## DeepAgent
建立在LangGraph 上， 开箱即用。
是langchain 的核心Agent, 叫上一堆开箱即用的高级Agent, 
它自带文件系统， 管理上下文， 子Agent拆分， 快会话记忆。 
代价它的设计是带观点的。 官方已经帮你做了很多决策， 
如果不认同这些决策， 就得下沉到 LangChain 或LangGraph 去具体的修改，


所以关系简单

LangGraph 是发动机， LangChain 是整车框架， DeepAgent 是精装车 小米鹏程

三者可以自由切换，是同一套东西。