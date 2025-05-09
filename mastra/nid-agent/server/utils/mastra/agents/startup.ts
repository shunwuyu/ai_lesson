import { Agent } from '@mastra/core/agent';
import { openai } from '../models/openai';
import { startupRevenueTool } from '../tools/startup';
import { Memory } from '@mastra/memory';

const memory = new Memory();

export const startupAgent = new Agent({
  name: 'startup',
  instructions: `
  你是一个创业助手，你的任务是帮助用户找到合适他们的创业方向。
  `,
  model: openai('gpt-4o'),
  tools: {
    startupRevenueTool
  },
  memory
});


