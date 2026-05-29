# Langchain

围绕AI做应用的框架，所有做AI应用都应该快速掌握的一个工具。
2022 年10月份, chatgpt 还没有正式发布。

- 提供基础工具
- 构建基础智能体

## demo 1
- npm init -y
- {
  "type": "module"
}
- npm install langchain @langchain/deepseek dotenv
  langchain 是框架
  @langchain/deepseek 是 deepseek 的集成包
  还有 @langchain/openai ...
  实现“插件式”接入不同模型提供商， 
  切换模型只需更换集成包，无需重写业务代码；

  简化了llm 调用的过程，只需要关注业务逻辑，无需关注模型的细节。

  ```
  import 'dotenv/config'
import { ChatDeepSeek } from '@langchain/deepseek'

const model = new ChatDeepSeek({
  // 不用去走openai, baseUrl
  model: 'deepseek-reasoner', // 或你可用的模型
  temperature: 0
})
// 统一模型调用接口
const res = await model.invoke('用一句话解释什么是 RAG')
console.log(res.content)

  ```

## PromptTemplate
假设你正在开发一个电商客服机器人，需要根据用户提问动态生成对商品的推荐理由。
const prompt = `你是客服，请基于以下商品信息回答用户问题。
商品：${product}
用户问题：${question}`;
langchain 提供了 PromptTemplate 类，用于创建可复用、可约束和可维护的 Prompt。
PromptTemplate = 可复用 + 可约束 + 可维护的 Prompt

```
import 'dotenv/config'
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatDeepSeek } from '@langchain/deepseek'

// 创建一个 PromptTemplate 实例，用于结构化地生成大模型提示（prompt）
// 通过占位符（如 {role}、{limit}、{question}）实现动态内容注入，
// 确保提示格式统一、可复用且易于维护。
// 1. 定义提示模板（LangChain 1.0 中 inputVariables 可省略，自动推断）
const prompt = PromptTemplate.fromTemplate(`
  你是一个{role}。
  请用不超过 {limit} 字回答下面问题：
  {question}
`);

const model = new ChatDeepSeek({ 
  model: 'deepseek-reasoner',
  temperature: 0 
})

// 3. 构建调用链：prompt → model
const promptStr = await prompt.format({
  role: '前端面试官',
  limit: '50',
  question: '什么是闭包？'
})

const res = await model.invoke(promptStr)
console.log(res.content)
```

## Chain —— LangChain 的灵魂
一句话理解 Chain： 把「Prompt + Model + Output」变成一个可组合的函数

![](https://img2.baidu.com/it/u=2263033120,2875060237&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=565)

## 更多例子