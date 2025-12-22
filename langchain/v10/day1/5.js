import { ChatDeepSeek } from '@langchain/deepseek';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod'; // 用于定义JSON结构校验规则
import 'dotenv/config';

// 1. 初始化模型
const model = new ChatDeepSeek({
  // model: 'gpt-4.1',
  model: 'deepseek-reasoner',
  
  // configuration: {
  //   apiKey: 'sk-NOyBZ0LVh3qEYRGaXkUgMHdjyHIDXiJVtgObW0ymaDFNogS9',
  //   baseURL: 'https://api.302.ai/v1',
  // },
  temperature: 0,
});

// 2. 定义JSON结构（用zod校验）
const FrontendConceptSchema = z.object({
  name: z.string().describe('概念名称'),
  core: z.string().describe('核心要点'),
  useCase: z.array(z.string()).describe('常见使用场景'),
  difficulty: z.enum(['简单', '中等', '复杂']).describe('学习难度'),
});

// 3. 初始化JSON解析器
const jsonParser = new JsonOutputParser(FrontendConceptSchema);

// 4. 构建提示模板（必须包含解析器的格式说明）
const prompt = PromptTemplate.fromTemplate(`
  你是一个只会输出 JSON 的 API，不允许输出任何解释性文字。

  ⚠️ 你必须【只返回】符合以下 Schema 的 JSON：
  - 不允许增加字段
  - 不允许减少字段
  - 字段名必须完全一致，使用name、core、useCase、difficulty
  - 返回结果必须可以被 JSON.parse 成功解析

  {format_instructions}

  前端概念：{topic}
`);

// 5. 组合Chain：提示渲染 → 模型调用 → JSON解析
const chain = prompt.pipe(model).pipe(jsonParser);

// 6. 调用Chain（传入格式说明参数）
const response = await chain.invoke({
  topic: 'Promise',
  format_instructions: jsonParser.getFormatInstructions(), // 告诉模型JSON格式要求
});

// 输出结构化结果
console.log('结构化结果：', response);
console.log('核心要点：', response.core);
console.log('使用场景1：', response.useCase[0]);