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
