import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '', // This is the default and can be omitted
    baseURL: 'https://api.chatanywhere.tech/v1'
});

async function main() {
    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            // prompt: '写一首描述春天的诗歌',
            prompt: '写一首关于汪峰爱上森林北的歌',
            max_tokens: 256
        })
        console.log(response.choices[0].text, '///////')
    } catch(error) {
        console.log(error)
    }
}

main();
