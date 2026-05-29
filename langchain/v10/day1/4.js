import { ChatDeepSeek } from '@langchain/deepseek';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables'; // 多步骤串联核心
import 'dotenv/config';

// 1. 初始化模型
const model = new ChatDeepSeek({
  model: 'deepseek-reasoner',
  temperature: 0
});

// 步骤2：解释概念的提示
const explainPrompt = PromptTemplate.fromTemplate(`
  你是前端专家，请详细解释以下概念：{topic}
  要求：覆盖定义、原理、使用方式，不超过300字。
`);

// 步骤2：总结核心的提示（依赖步骤1的结果）
const summaryPrompt = PromptTemplate.fromTemplate(`
  请将以下前端概念解释总结为3个核心要点（每点不超过20字）：
  {explanation}
`);

// 2. 组合多步骤Chain
// 步骤1：解释概念 → 模型调用
const explainChain = explainPrompt.pipe(model);
// 步骤2：基于步骤1的结果总结 → 模型调用
const summaryChain = summaryPrompt.pipe(model);

// 串联两个Chain：先解释，再把解释结果传给总结链
const fullChain = RunnableSequence.from([
  // 第一步：接收topic，输出explanation
  (input) => explainChain.invoke({ topic: input.topic }).then(res => res.text),
  // 第二步：接收explanation，输出summary
  (explanation) => summaryChain.invoke({ explanation }).then(res => `知识点：${explanation} 总结：${res.text}`),
]);

// 3. 调用完整Chain
const response = await fullChain.invoke({
  topic: '事件循环',
});

// 输出总结结果
console.log('事件循环：\n', response);
// 有点工作流的感觉