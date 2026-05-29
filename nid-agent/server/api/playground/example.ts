// defineEventHandler 是 Nuxt 3 中的一个函数，用于定义 API 路由的事件处理器，简化了处理请求和响应的逻辑。
export default defineEventHandler(async (event) => {
    const systemPrompt = `
        Example Input:
        title: this b2b startup raised millions of dollars in funding
        category: B2B, startup

        Example JSON Output:
        {
            "title": "this b2b startup raised millions of dollars in funding",
            "category": ["B2B, startup"]
        }
    `
    const userInput = 'This productivity app scaled to 1000 users in 3 months.'
    const userPrompt = `
        title: ${userInput}
        category:
    `
    const completion = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        response_format: { type: 'json_object' },
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: userPrompt
            }
        ],
        stream: false
    })
    const result = completion.choices[0].message.content
    return result
})