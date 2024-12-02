import { config } from 'dotenv'
import { ChatOpenAI } from "@langchain/openai";
config()

const model = new ChatOpenAI({ 
  model: "gpt-3.5-turbo",
  temperature: 0 
});

const stream = await model.stream("Hello! Tell me about yourself.");
const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);
  // console.log(`${chunk.content}|`);
}
// 查看
// AIMessageChunk
// console.log(chunks[0])

let finalChunk = chunks[0];

for (const chunk of chunks.slice(1, 5)) {
  finalChunk = finalChunk.concat(chunk);
}

console.log(finalChunk);