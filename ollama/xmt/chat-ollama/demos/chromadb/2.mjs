import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Embeddings } from "@langchain/core/embeddings"
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama"

const embeddings = new OllamaEmbeddings({
  model: 'nomic-embed-text',
  baseUrl: 'http://localhost:11434',
})

const vectorStore = new Chroma(embeddings, {
  collectionName: 'collection_14',
  url: 'http://localhost:8000'
})  

async function queryEmbeddings(queryText, nResults = 1) {
  try {
    // 生成查询向量
    const queryEmbedding = await embeddings.embedQuery(queryText);
    console.log(queryEmbedding)
    // 查询集合
    const results = await vectorStore.similaritySearchVectorWithScore(queryEmbedding, nResults);

    console.log('Query Results:', results);
  } catch (error) {
    console.error('Error querying embeddings:', error);
  }
}

// 示例查询
const queryText = "孙悟空";
queryEmbeddings(queryText);

// console.log(vectorStore)
