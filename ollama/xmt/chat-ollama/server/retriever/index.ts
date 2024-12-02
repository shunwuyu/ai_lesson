// langchain 提供了文本切割器
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
// 类型
import { Embeddings } from "@langchain/core/embeddings"
//
import { Document } from "@langchain/core/documents"
// import { RedisDocstore } from '@/server/docstore/redis'
// 创建向量存储
import { createVectorStore } from "@/server/utils/vectorstores"

// 检索器
export const createRetriever = async (embeddings: Embeddings, collectionName: string, documents: Document[] | null = null) => {
  // 实例化向量数据库
  const vectorStore = createVectorStore(embeddings, collectionName)
  if (process.env.VECTOR_STORE === 'chroma') {
    // 确保存在， 不存在就创建
    await vectorStore.ensureCollection();
  }

  let retriever = null

  if (process.env.REDIS_HOST) {

  } else {
    if (documents !== null) {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkOverlap:200,
        chunkSize: 1000
      })
      const splits = await splitter.splitDocuments(documents)
      // 会自动嵌入向量
      await vectorStore.addDocuments(splits)
    }

    return vectorStore.asRetriever(4)
  }
}