# 大脑接入：抽象 Provider 接口，适配 Claude 与 OpenAI 兼容大模型

在前面的课程中，我们犹如打造精密钟表一般，用 Go 语言构建了 go-tiny-claw 的核心部件。特别是上一讲，我们在 ReAct 循环中巧妙地剥离出了独立的慢思考（Thinking）阶段，从架构机制上压制了大模型的行动冲动。

然而，这台设计精妙的微型操作系统（Harness），目前依然连接着一个 mockProvider（假肢大脑）。今天，我们将正式拔掉这双“假肢”，为引擎接入真实的前沿大模型。


在真实的企业级 AI 应用开发中，我们面临着一个绕不开的碎片化痛点：不同大模型厂商的 API 数据结构存在巨大差异。特别是涉及 Function Calling（工具调用）和上下文组装时，OpenAI 生态和 Anthropic（Claude）生态是两套截然不同的标准。

如果在我们的核心 Main Loop 中直接写入这些特定厂商的 SDK 代码，整个驾驭工程（Harness Engineering）的解耦原则就会被彻底破坏。

本讲，我们将通过设计优雅的 Provider 抽象层，完美隔离这种差异。为了兼顾国内网络环境的便利性，我们将使用国内的智谱大模型（GLM）来作为统一的算力底座。由于智谱 API 实现了对 OpenAI 和 Claude 两大生态双协议的兼容，我们将在同一套代码中，演示如何通过官方的 OpenAI Go SDK 和 Anthropic Go SDK，双管齐下地接入 glm-4.5-air 模型。

我们的微型 OS 具备了“即插即用”换大脑的能力。

