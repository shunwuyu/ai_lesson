import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
    configuration: {
      baseURL: "https://api.302.ai/v1",
      apiKey: 'sk-X0elCqFwBaSuKkLwmcvMKGMlacmRAwmb2hjaKm4MxBu2cdIY'
    },
    model: "gpt-3.5-turbo"
  });


const messages = [
  new SystemMessage("Translate the following from English into Italian"),
  new HumanMessage("hi!"),
];

console.log(await model.invoke(messages));