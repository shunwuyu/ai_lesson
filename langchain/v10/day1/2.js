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