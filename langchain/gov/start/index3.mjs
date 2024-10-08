import { config } from 'dotenv'
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

config()

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

// console.log(process.env)

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const messages = [
  new SystemMessage("Translate the following from English into Chinese"),
  new HumanMessage("hi!"),
];
// StringOutputParser 
const parser = new StringOutputParser();

const result = await model.invoke(messages);
// 执行parse 
console.log(await parser.invoke(result)); // 

