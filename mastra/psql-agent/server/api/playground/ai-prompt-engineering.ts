import { generateText } from 'ai';

export default defineEventHandler(async (event) => {
    const { input } = await readBody(event)
    const prompt = `${input}`

    const { response } = await generateText({
        model: openaiProvider('gpt-4o'),
        temperature: 0,
        maxTokens: 2000,
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    });

    return response.messages[0]
})