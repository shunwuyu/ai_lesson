import { z } from 'zod';
// 先定义“数据形态”，再让模型对齐
export const ConceptSchema = z.object({
  name: z.string(),
  core: z.string(),
  useCase: z.array(z.string()),
  difficulty: z.enum(['简单', '中等', '复杂']),
});
