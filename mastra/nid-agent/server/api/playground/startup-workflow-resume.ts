import { mastra } from '../../utils/mastra';

export default defineEventHandler(async (event) => {
    const { runId, stepId, context } = await readBody(event);
    const workflow = mastra.getWorkflow('startupWorkflow');

    const result = await workflow.resume({
        runId,
        stepId,
        context
    });

    return result;

})