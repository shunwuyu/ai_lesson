// 问答系统
import { config } from 'dotenv'
config()

import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

const template = `Answer the question based only on the following context:
{context}

Question: {question}
`;
const prompt = ChatPromptTemplate.fromTemplate(template);

const vectorstore = await MemoryVectorStore.fromTexts(
  ["mitochondria is the powerhouse of the cell", "buildings are made of brick"],
  [{}, {}],
  new OpenAIEmbeddings()
);

const retriever = vectorstore.asRetriever();

// const chunks = [];

// for await (const chunk of await retriever.stream(
//   "What is the powerhouse of the cell?"
// )) {
//   chunks.push(chunk);
// }

// console.log(chunks);

const formatDocs = (docs) => {
  return docs.map((doc) => doc.pageContent).join("\n-----\n");
};

const retrievalChain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocs),
    question: new RunnablePassthrough(), // 直接传递，不做修改
  },
  prompt,
  model,
  new StringOutputParser(),
]);

const stream = await retrievalChain.stream(
  // "What is the powerhouse of the cell?"
  "What are building made of"
);

for await (const chunk of stream) {
  console.log(`${chunk}|`);
}