import { generateText } from 'ai'
// import { deepseekProvider } from '../utils/ai'
import { openaiProvider } from '../utils/ai'

export default defineEventHandler(async(event) => {
    // const { industry } = await readBody(event)
    // const response = await generateText({
    //     model: openaiProvider('gpt-4o'),
    //     system: 'You are a helpfull assistant, created by startupintell. Use emoji more in your response.',
    //     prompt: `I want to build a startup in the ${industry} industry, please give me 10 ideas`
    // })
    // return response
    const { content } = await readBody(event)
    const response = await generateText({
        model: openaiProvider('gpt-4o'),
        messages: [
            {
                "role": 'system',
                'content': "You are a helpfull assistant, created by startupintell. Use emoji more in your response."
            },
            {
                "role": 'user',
                'content':'hello my name is wanghao'
            },
            {
                "role": "assistant",
                "content": "hello, wanghao"
            },
            {
                role: "user",
                content
            }
        ]
    })
    return response
})

