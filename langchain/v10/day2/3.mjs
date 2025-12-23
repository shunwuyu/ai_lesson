import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatDeepSeek } from '@langchain/deepseek';
import { ConceptSchema } from './1.mjs';
import 'dotenv/config'
// Zod 是 TypeScript/JavaScript 生态下的类型校验库，通过定义 Schema
//  实现数据结构验证、类型推断，确保输入数据符合预期格式。
const parser = StructuredOutputParser.fromZodSchema(
  ConceptSchema
);
const model = new ChatDeepSeek({ 
  model: 'deepseek-reasoner',
  temperature: 0 
});

// 强约束 Prompt 成败关键
const prompt = PromptTemplate.fromTemplate(`
  你是一个后端接口，只允许返回 JSON。
  
  规则：
  - 只能返回 JSON
  - 不允许多字段
  - 不允许解释性文字
  
  {format_instructions}
  
  前端概念：{topic}
  `);
  // 当 parser 解析大模型输出失败（如格式不合法）时，会自动
  // 重新尝试解析，这里配置 retries: 2 表示最多重试 2 次，
  // 提升解析成功率。
const chain = prompt
  .pipe(model)
  .pipe(parser.withRetry({ retries: 2 }));



const res = await chain.invoke({
  topic: 'Promise',
  format_instructions: parser.getFormatInstructions(),
});
console.log(res.core);
console.log(res.useCase[0]);
  