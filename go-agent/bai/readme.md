[source](https://time.geekbang.org/column/article/967047)

- 需求
  从 0 开始构建 Agent Harness， 如果不用 LangChain 或者 AutoGen 等框架，一个原生的、能够稳定运行于工业环境的 Agent 到底长什么样？OpenClaw 这样的顶级开源引擎，其底层架构究竟精妙在哪里？

  让我们一起来编写 go-tiny-claw

- 初始化项目

go mod init github.com/shunwuyu/go-tiny-claw
初始化 Go 模块， 模块路径为[github.com/shunwuyu/go-tiny-claw](https://github.com/shunwuyu/go-tiny-claw)，用于依赖管理。
帮你管好项目要用的第三方代码，保证在哪都能正常编译运行。
github.com/shunwuyu/go-tiny-claw 这个包以后在 Github 这个位置，别人能直接引用。
本地自己玩，随便写个名字比如 `go-tiny-claw` 也完全没问题。
项目发布到 GitHub 后，它本身就是一个可被别人 import 导入的 Go 包

- 创建项目骨架
  - cmd/claw/main.go  程序的入口
  - internal/engine  核心引擎层 (Main Loop)
  - internal/provider  模型适配层
  - internal/context   上下文工程层
  - internal/tools     工具与执行层
  - internal/memory    状态与记忆层
  - internal/feishu    飞书集成层

> 正如你所见，只要大模型返回的结果中包含“工具调用请求（Tool Call  Request）”，这个 Loop 就会一直循环下去。每一次从“组装 Prompt”到“追加观察结果”，我们称之为一个 Turn（轮次）。


- 在 Harness 驾驭引擎中，各个组件（大模型、工具、主循环）之间传递的数据就是上下文（Context）

我们必须定义一套属于 go-tiny-claw 自己的标准数据结构，来承载 ReAct 范式中的“思考”与“行动”。



