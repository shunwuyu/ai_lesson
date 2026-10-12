# Vercel AI SDK + Langchain 实现流式组件渲染

AG-UI 是开放事件驱动协议，规范 AI 智能体与前端通信，流式传输文本、工具调用，同步 Agent 状态，实现跨框架对接。

Data Stream Protocol 是 AI SDK 原生配套协议，主打轻量化对话流式传输；AG-UI 是跨框架通用 Agent 协议，侧重状态同步与人机审批，二者定位不同。


{
    "messages":[
        {"role":"user","parts" : [ { "type" : "text" , "text" : "北京今天的天气" }]}
    ]
}

我们基于 AGUI（Agent–User Interaction Protocol）协议实现了流式渲染文本、tool call 组件的效果。

用的是 Vercel AI SDK 的 Data Stream Protocol。

Vercel AI SDK 自研的协议，开源开放
底层传输依然用标准 SSE（浏览器原生），但**事件格式、数据结构是 Vercel 自定义**；

后端用 LangChain 来写 Agent，我们不再手写 agent loop，直接用了 createAgent 的 api

通过 @ai-sdk/langchain 把 stream 转为基于 Data Stream Protocol 协议的 SSE 流
把 langchain 得到的大模型流式输出转为 符合 Vercel Data Stream Protocol 规范的 SSE 事件流


前端用 @ai-sdk/react 或者 @ai-sdk/vue 的 useChat 来解析这个 SSE 流，拿到 messages。

useChat 会自动接收并解析后端遵守 Data Stream Protocol 的 SSE 流，维护对话 messages 状态，同时提供发送消息、终止流式响应等聊天能力。

根据 message 是文本还是 tool call 做不同的渲染

文本用 streamdown 流式渲染，会解析 markdown 的表格、mermaid 流程图、代码等语法，用不同组件展示

**streamdown**：支持边接收增量文本边实时解析 Markdown，可渲染表格、Mermaid、代码块，流式输出对应 UI 组件。

tool call 则是自定义组件实现渲染

对接了AGUI协议后， Agent 的交互体验就好多了