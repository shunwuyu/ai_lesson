import { config } from "dotenv"
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";

// const loader = new TextLoader("data/qiu.txt");
const loader = new TextLoader("data/test.txt");
const docs = await loader.load();
config();


// console.log(process.env)
// 用于将文本拆分为较小的块
// 哪一块放到prompt? 
// 折叠 语义被切割
const splitter = new RecursiveCharacterTextSplitter({
  // 500 字符
  chunkSize: 500,
  chunkOverlap: 100,
});

const splitDocs = await splitter.splitDocuments(docs);
// console.log(splitDocs);
// 嵌入向量实例
const embeddings = new OpenAIEmbeddings();
// 内存向量数据库
const vectorstore = new MemoryVectorStore(embeddings);
// 向数据库中添加嵌入后的文档
await vectorstore.addDocuments(splitDocs);

console.log('Stored documents:', vectorstore.memoryVectors);

// // 一是从向量存储中创建一个检索器
// const retriever = vectorstore.asRetriever(2)
// // console.log(retriever., '????');
// // 二是使用该检索器根据给定的查询语句进行检索，并打印检索结果
// // const res = await retriever.invoke("我是谁？")
// // console.log(res);

// // 创建聊天模型实例
// const chatModel = new ChatOpenAI({ temperature: 0 });

// const qaChain = ConversationalRetrievalQAChain.fromLLM(chatModel, retriever);
// // const question = "我是谁？";
// const question = "原文中，谁提出了宏原子的假设？"

// const chatHistory = [];
// // 调用问答链获取回答
// const response = await qaChain.call({ question, chat_history:chatHistory });
// // 打印回答
// console.log(response.text);