import { OpenAIEmbeddings } from "@langchain/openai";
import 'dotenv/config'

const embeddings = new OpenAIEmbeddings({
  // 指定 302.ai 的基础 URL
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  model: "text-embedding-ada-002", // 或 302.ai 支持的 embeddings 模型
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  const text = "这是一个测试向量化文本";
  const vector = await embeddings.embedQuery(text);
  console.log("Embedding vector:", vector);
})();