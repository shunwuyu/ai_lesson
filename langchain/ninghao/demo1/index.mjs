// import * as dotenv from 'dotenv'
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
// dotenv.config()
process.env.OPEANAI_API_KEY='sk-WR039dc5929d38c0e9caa911fba9aa0968839a41489KzUET'
process.env.OPENAI_API_BASE='https://api.gptsapi.net/v1'

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0
});

console.log(await model.invoke([new HumanMessage({ content: "Hi! I'm Bob" })]));