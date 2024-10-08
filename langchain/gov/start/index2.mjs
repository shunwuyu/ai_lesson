import { config } from 'dotenv'
import { ChatOpenAI } from "@langchain/openai";

config()

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

// console.log(process.env)

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const messages = [
  new SystemMessage("Translate the following from English into Chinese"),
  new HumanMessage("hi!"),
];

console.log(await model.invoke(messages)); // 

