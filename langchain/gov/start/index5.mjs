import { config } from 'dotenv'
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

config()

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });
// 配合下拉框实现
const systemTemplate = "Translate the following into {language}:";
// {}
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);
// 执行下模版编译
const promptValue = await promptTemplate.invoke({
  language: "italian",
  text: "hi",
});
// lc_namespace: [ 'langchain_core', 'prompt_values' ]
// console.log(promptValue)
// console.log(promptValue.toChatMessages())

const parser = new StringOutputParser();

const llmChain = promptTemplate.pipe(model).pipe(parser);
// RunnableSequence inputVariables: [ 'language', 'text' ]
// console.log(llmChain);
console.log(await llmChain.invoke({ language: "french", text: "hi" }));