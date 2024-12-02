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
const chain = model.pipe(parser);
// 打印看下 得到的是一个SequenceChain
// console.log(chain);
// const result = await model.invoke(messages);
// // 执行parse 
// console.log(await parser.invoke(result)); // 
console.log(await chain.invoke(messages));

