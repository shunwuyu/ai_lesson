import { mastra} from '~/server/utils/mastra';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
    const agent = mastra.getAgent("startupAgent")
    const schema = z.object({
        ideas: z.array(z.object({
            name: z.string().describe('The name of the idea'),
            description: z.string().describe('The description of the idea')
        }))
    })

    const result = await agent.generate([
        {
            role: 'user',
            content: '你能做什么'
        }
    ], {
        output: schema
    })
    return result;
})