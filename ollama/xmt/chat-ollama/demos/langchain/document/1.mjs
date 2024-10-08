import { formatDocumentsAsString } from "langchain/util/document"

const documents = [
  { pageContent: "This is the first document.", metadata: { source: "file1.txt" } },
  { pageContent: "This is the second document.", metadata: { source: "file2.txt" } },
  { pageContent: "This is the third document.", metadata: { source: "file3.txt" } }
];

const formattedString = formatDocumentsAsString(documents);

console.log(formattedString);