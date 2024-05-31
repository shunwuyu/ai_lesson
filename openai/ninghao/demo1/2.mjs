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
            prompt: '叮，我收到一条短信，显示我的招行里存入了五个亿。',
            suffix: '想想当初与好友一起创业的日子，真的像是在做梦一样。',
            temperature: 1,
            max_tokens: 2110,
            top_p: 1
        })
        console.log(response.choices[0].text, '///////')
    } catch(error) {
        console.log(error)
    }
}

main();
