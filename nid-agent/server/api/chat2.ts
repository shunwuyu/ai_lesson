export default defineEventHandler(async (event) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'hello'
            }
        ]
    })
    return completion
})