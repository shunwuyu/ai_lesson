[source](https://js.langchain.com/docs/tutorials/llm_chain)

## start

pnpm add langchain @langchain/core
pnpm add @langchain/openai 

- index2.mjs 翻译 模型的基本使用 .env  不需要传那些key
- outputparser
  response from the model is an AIMessage
  we may just want to work with the string response
  parse out just this response by using a simple output parser
  index3.mjs
  
- chain it together
  model + parser
  index4.mjs

- prompt template
  index5.mjs

- Stream
  index6.mjs

- Stream with chain
  index7.mjs

- JSON output
  index8

- JSON output with function call
  index9

- 问答系统
  index10
  MemoryVectorStore 是 LangChain 库中的一个内存向量存储类，用于在内存中存储和检索向量数据。它适合临时数据存储和快速原型开发，提供了高效的向量搜索功能

- memory index11
  - 填充
  - trimming old messages to reduce the amount of distracting information

- ChatMessageHistory addMessage index12
- conversation truns index13
  We can use it directly to store conversation turns for our chain
- automatic history management
  index14
- modify history   通过多轮回答 name 出来了
  index15
- with trimming messages 
  index16
- summary memory
  index17  将message 打成纪录
- fewshot template
  index18
- 
- load document
  