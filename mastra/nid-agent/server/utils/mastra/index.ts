import { Mastra } from '@mastra/core/mastra';
import { startupAgent } from './agents/startup';
import { startupWorkflow } from './workflows/startup';

export const mastra = new Mastra({
  agents: {
    startupAgent
  },
  workflows: {
    startupWorkflow
  }
})