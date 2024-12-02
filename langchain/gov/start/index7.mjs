import { config } from 'dotenv'
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
config()

const model = new ChatOpenAI({ 
  model: "gpt-3.5-turbo",
  temperature: 0 
});

const prompt = ChatPromptTemplate.fromTemplate("Tell me a joke about {topic}");
const parser = new StringOutputParser();
const chain = prompt.pipe(model).pipe(parser);

const stream = await chain.stream({
  topic: "parrot",
});

const chunks = [];
for await (const chunk of stream) {
  // chunks.push(chunk);
  console.log(`${chunk}|`);
}

