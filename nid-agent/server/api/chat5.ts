const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    const completion = await $fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.deepseekApiKey}`
        },
        body: {
            model: 'deepseek-chat',
            messages: body.messages
        }
    })
    return completion
})