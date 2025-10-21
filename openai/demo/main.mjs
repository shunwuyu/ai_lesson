import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'sk-g2aGXLfj9ScHVMH1RumFwM9Mc2nS0KBjrP4uvwMBmNAYRRkp', // This is the default and can be omitted
    baseURL: 'https://api.302.ai/v1'
});


try {
    const result = await client.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: 'hello',
    })
    console.log(result.choices[0].text);
} catch(e) {
    console.log(e)
}