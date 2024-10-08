import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
// 制定了embedding
const embeddings = new OllamaEmbeddings({
  model: 'nomic-embed-text',
  endpoint: 'http://localhost:11434'
});
const text = "This is a sample text.";
const vector = await embeddings.embedQuery(text);
console.log(vector);