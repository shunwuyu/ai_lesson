import { Embeddings } from "@langchain/core/embeddings";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const createChromaVectorStore = (embeddings: Embeddings, collectionName: string) => {
  console.log("Creating Chroma vector store");
  return new Chroma(embeddings, {
    collectionName,
    url: process.env.CHROMADB_URL
  })
};

export const createVectorStore = (embeddings: Embeddings, collectionName: string) => {
  return createChromaVectorStore(embeddings, collectionName);
};