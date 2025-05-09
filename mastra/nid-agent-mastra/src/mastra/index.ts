import { VercelDeployer } from '@mastra/deployer-vercel';
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  deployer: new VercelDeployer({
    teamId:'team_MyI6bjGfyvsGeVOwtkTOTH2r',
    token: 'AAz6AiEai63OS7NAR7CXj9t9',
    projectName: 'nid-agent-mastra',
  }),
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
