// 导入 OpenAI 聊天完成功能所需的类型定义
// ChatCompletionMessageParam: 聊天消息参数类型
// ChatCompletionTool: 聊天工具类型
import type {
    ChatCompletionMessageParam,
    ChatCompletionTool
} from 'openai/resources/chat/completions'
// defineEventHandler 是 Nuxt/Nitro 中用于定义服务器 API 路由处理函数的工具
export default defineEventHandler( async (event) => {
    const getWeather = async (location: string) => {
        // console.log('getWeather', location);
        return {
            temperature: -1,
            description: 'sunny'
        }
    }

    const tools: Array<ChatCompletionTool> = [
        {
            type: 'function',
            function: {
                name: 'get_weather',
                description: 'Get the current weather in a location',
                parameters: {
                    type: 'object',
                    properties: {
                        location: {
                            type: 'string',
                            description: 'The city and state, e.g. San Francisco, CA'
                        }
                    },
                    required: ['location']
                }
            }
        }
    ]

    const messages: Array<ChatCompletionMessageParam> = [
        {
            role: 'user',
            content: 'What is the weather in Jinan'
        }
    ]
    // 制定了可用工具 从messages 得到要调用的工具
    const completion = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages,
        tools
    })

    if (completion.choices[0]?.message.tool_calls) {
        const toolCall = completion.choices[0].message.tool_calls[0];

        if (toolCall.function.name === 'get_weather') {
            const args = JSON.parse(toolCall.function.arguments);
            const weatherData = await getWeather(args.location);
            console.log(weatherData, '/////')
            messages.push({
                role: "assistant",
                tool_calls: [
                    {
                        id: toolCall.id,
                        type: 'function',
                        function: {
                            name: 'get_weather',
                            arguments: "{}"
                        }
                    }
                ]
            })
            messages.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                content: JSON.stringify(weatherData)
            })

            const finalCompletion = await deepseek.chat.completions.create({
                model: 'deepseek-chat',
                messages,
                temperature: 0.7
            })


            return finalCompletion;
        }
    }
    
    return completion
})

