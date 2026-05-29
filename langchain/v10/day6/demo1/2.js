import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const loader = new PDFLoader("a.pdf");
const docs = await loader.load();
// console.log(docs) //标准格式
// 创建文本分割器实例，专门把大段文本拆成小的文本块（方便后续LLM处理）
const textSplitter = new RecursiveCharacterTextSplitter({
  // chunkSize：每个拆分后的文本块最多包含1000个字符（核心控制单块的大小，比如1000字以内）
  chunkSize: 1000,
  // chunkOverlap：相邻两个文本块之间要重叠200个字符；
  // 作用是避免拆分后上下文断开（比如一句话被切到两个块里读不通），重叠的部分能保证语义连贯
  chunkOverlap: 200,
});

const allSplits = await textSplitter.splitDocuments(docs);

console.log(allSplits.length);
console.log(allSplits[1]);