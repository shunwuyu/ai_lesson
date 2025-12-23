import { JsonOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatDeepSeek } from '@langchain/deepseek';
import { ConceptSchema } from './1.mjs';
import 'dotenv/config'


const parser = new JsonOutputParser({
  schema: ConceptSchema,
});

console.log(parser);

const prompt = PromptTemplate.fromTemplate(`
  你是一个 JSON API，只能返回 JSON。
  
  {format_instructions}
  
  前端概念：{topic}
  `);

const model = new ChatDeepSeek({ 
  model: 'deepseek-reasoner',
  temperature: 0 
});
const chain = prompt
  .pipe(model)
  .pipe(parser);

const result = await chain.invoke({
  topic: '闭包',
  format_instructions: parser.getFormatInstructions(),
});

console.log(result);