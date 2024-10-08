// 递归
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const longText = `
This is a very long text that needs to be split into smaller chunks. Each chunk should be a reasonable size for further processing, such as feeding into a machine learning model or a natural language processing pipeline. The RecursiveCharacterTextSplitter ensures that the text is split in a way that maintains sentence and paragraph boundaries as much as possible.

Here is another paragraph of text. It contains some more information that we want to split into manageable pieces. This will help us process the text more efficiently and effectively.
`;

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100, //最大长度 单位是字节
  chunkOverlap: 20 //每个片段之间的重叠长度
})
// 接受文本数组
const chunks = await splitter.createDocuments([longText])

chunks.forEach((chunk, index) => {
  console.log(`Chunk ${index + 1}:`);
  console.log(chunk.pageContent);
  console.log('---');
})