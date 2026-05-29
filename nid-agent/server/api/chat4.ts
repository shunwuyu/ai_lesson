export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const completion = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages: body.messages
    })
    return completion
})