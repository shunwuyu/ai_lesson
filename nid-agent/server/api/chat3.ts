export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: body.messages
    })
    return completion
})