import { ChatDeepSeek } from '@langchain/deepseek'
import { PromptTemplate } from '@langchain/core/prompts'
import 'dotenv/config'
// 模型
// runnable 接收提示 → 调用大模型 → 返回响应。
const model = new ChatDeepSeek({ 
  model: 'deepseek-reasoner',
  temperature: 0 
})
//runnable 接收输入变量 → 渲染成完整提示字符串
const prompt = PromptTemplate.fromTemplate(`
  你是一个前端专家，用一句话解释：{topic}
`);
// pipe 将两个 Runnable 连接成一个新 Runnable
// 等价于创建了一个组合函数：
// chain(input) = model( prompt(input) )
const chain = prompt.pipe(model);
// console.log(chain);
// 调用链：chain(input) = model( prompt(input) )
// prompt 先用输入渲染出完整的提示
// 渲染结果自动传给 model
// model 调用 DeepSeek API 并返回结果
const response = await chain.invoke({
  topic: '事件循环'
});

console.log(response.text)

// Chain 和直接 invoke 有什么区别？
// invoke 是一次性调用，
// Chain 把 Prompt、模型、参数、输出结构 封装成可复用执行单元，
// 更适合复杂流程和工程化。

