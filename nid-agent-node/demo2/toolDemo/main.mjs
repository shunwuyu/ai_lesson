import OpenAI from 'openai';
import { configDotenv  } from 'dotenv';
configDotenv();

const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL,
})

const messages = [
    {
        role: 'user',
        content: 'What is the weather in Jinan'
    }
]

const getWeather = async (location) => {
    console.log('getWeather', location);
    return {
        temperature: 37,
        description: 'sunny'
    }
}

const tools = [
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
                        description: 'the city and state, e.g San Francisco, CA'
                    }
                },
                required: ['location']
            }
        }
    }
]

const completion = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages,
    tools,
    tool_choice: "auto"
})

messages.push(completion.choices[0].message);

// console.log(completion.choices[0].message)

if (completion.choices[0]?.message.tool_calls) {
    const toolCall = completion.choices[0].message.tool_calls[0];
    
    const functionName = toolCall.function.name;
    console.log(functionName)
    if (functionName === 'get_weather') {
        const functionArgs = JSON.parse(toolCall.function.arguments);
        console.log(functionArgs)
        const weatherData = await getWeather(functionArgs.location);
        messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(weatherData)
        });

        const finalCompletion = await deepseek.chat.completions.create({
            model: 'deepseek-chat',
            messages,
            temperature:0.7
        })
        console.log(finalCompletion.choices[0].message.content)
    }
    
    // console.log('result', result);

}
