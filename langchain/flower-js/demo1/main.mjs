import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";

const personalizedGreetingPrompt = new PromptTemplate({
    inputVariables: ["price", "flower_name"],
    template: "您是一位专业的鲜花店文案撰写员。\n对于售价为 {price} 元的 {flower_name} ，您能提供一个吸引人的简短描述吗？",
});


const model = new ChatOpenAI({
    configuration: {
        baseURL: "https://api.gptsapi.net/v1",
        apiKey: 'sk-WR039dc5929d38c0e9caa911fba9aa0968839a41489KzUET'
    },
    model: "gpt-3.5-turbo"
});
  
const chain = personalizedGreetingPrompt.pipe(model)
const result = await chain.invoke({
    price: '99',
    flower_name: '玫瑰'
})
console.log(result)
//   console.log(formattedPersonalizedGreeting);