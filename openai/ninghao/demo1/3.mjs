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
            prompt: `
            hello everyone, today i'm going to talk about how to use openai api to build a app.
            请将以上内容转换大小写，专有名词大写，同时修正话语法问题并返回
            `,
            max_tokens: 1000,
            temperature: 0
        })
        console.log(response.choices[0].text, '///////')
    } catch(error) {
        console.log(error)
    }
}

main();
