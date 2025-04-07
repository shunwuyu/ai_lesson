import { generateText } from 'ai'
// import { deepseekProvider } from '../utils/ai'
import { openaiProvider } from '../utils/ai'

export default defineEventHandler(async(event) => {
    // const response = await generateText({
    //     model: deepseekProvider('deepseek-chat'),
    //     prompt: 'hello'
    // })
    const response = await generateText({
        model: openaiProvider('gpt-4o'),
        prompt: 'hello'
    })
    return response
})

