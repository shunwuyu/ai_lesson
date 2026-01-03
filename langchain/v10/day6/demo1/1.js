import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("a.pdf");
const docs = await loader.load();
console.log(docs) //标准格式

