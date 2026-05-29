import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const startupRevenueTool = createTool({
  id: 'startupRevenue',
  description: 'Get the revenue of a startup',
  inputSchema: z.object({
    startupName: z.string().describe('The name of the startup'),
  }),
  execute: async({context}) => {
    return {
        startup: context.startupName,
        revenue: 1000000
    }
  }
});
