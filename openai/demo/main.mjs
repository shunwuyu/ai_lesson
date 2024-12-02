import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey:'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'
})

const openai = new OpenAIApi(configuration);

try {
    const result = await openai.createCompletion({
        engine: 'text-davinci-003',
        prompt: 'hello',
        maxTokens: 5,
        temperature: 0.9,
        topP: 1
    })
    console.log(result);
} catch(e) {
    console.log(e)
}