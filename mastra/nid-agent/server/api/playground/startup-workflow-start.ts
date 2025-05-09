import { mastra} from '../../utils/mastra'

export default defineEventHandler(async (event) => {
    const { startupName } = await readBody(event)
    console.log('startupName', startupName)
    const workflow = mastra.getWorkflow('startupWorkflow')
    const { start } = workflow.createRun();
    const result = await start({
        triggerData: {
            startupName
        }
    })
    return result;
})