import * as dotenv from 'dotenv'
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
dotenv.config();

const promptTemplate = new PromptTemplate({
    template: `写一首描述{subject}的诗歌`,
    inputVariables:['subject']
})

// const prompt = await promptTemplate.format({
//     subject: '春天'
// })

// // console.log(prompt)

const model = new ChatOpenAI({
    configuration: {
        baseURL: "https://api.302.ai/v1",
        apiKey: 'sk-X0elCqFwBaSuKkLwmcvMKGMlacmRAwmb2hjaKm4MxBu2cdIY'
    },
    model: "gpt-3.5-turbo"
});

const chain = new LLMChain({ llm: model, prompt:promptTemplate });

const response = await chain.call({
    subject: '冬天'
});
console.log(response)