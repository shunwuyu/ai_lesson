import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
    configuration: {
        baseURL: "https://api.gptsapi.net/v1",
        apiKey: 'sk-WR039dc5929d38c0e9caa911fba9aa0968839a41489KzUET'
    },
    model: "gpt-3.5-turbo"
});

const res = await model.invoke(
"Question: What would be a good company name a company that makes colorful socks?\nAnswer:"
);
console.log({ res });