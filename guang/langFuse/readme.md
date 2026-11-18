# LangFuse: 开源可内网部署的Agent 全链路检测方案

**LangSmith** 做Agent 的全链路检测， 以及跑效果评估的实验。

它是线上的服务，不用自己部署，直接接入就行。

但是，本地调试用 LangSmith 没问题，很方便，配几个环境变量就行，LangChain、LangGraph 开箱即用。

那如果是线上呢？

LangSmith 线上服务是收费的。

如果你想用免费方案，那就得用 LangFuse 了，它是开源的，可以自己部署。

且它也不绑定具体框架，但各种 Agent 框架都很容易集成。

它有 cloud 开箱即用版，和自己部署，两种方式。

我们先来试一下 cloud 版：

登录一下：

[https://cloud.langfuse.com/](https://cloud.langfuse.com/)

- tracing 追踪 LLM/Agent 全链路调用日志、耗时、输入输出与异常，方便调试、观测和评估应用。
- monitors 线上持续监控追踪数据，告警异常、统计指标，实时观测 Agent 生产运行状态。（图）
- evaluators 是自动评估器，用来按规则 / 模型打分，自动校验 tracing 里的输出质量、正确性，批量评测 Agent 效果。
- Datasets 评测数据集，用来存放测试样本，配合 evaluators 批量跑评估，持续对比版本效果。
- Experiments 实验任务，基于数据集跑不同版本链路，对比评估指标，用来做版本 A/B 测试

## demo
- OpenTelemetry 是一套通用埋点标准，给程序生成链路、指标、日志，数据能发给 Langfuse 这类平台查看。
- @langfuse/core Langfuse JS SDK 底层基础包，提供客户端、类型、配置
- @langfuse/langchain Langfuse JS SDK 集成 LangChain，提供 LangChain 相关的追踪、评估、监控功能
- @langfuse/otel Langfuse JS SDK 集成 OpenTelemetry，提供 OpenTelemetry 相关的追踪、评估、监控功能