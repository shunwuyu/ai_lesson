// Simple in-memory vector store replacement for
// @langchain/community/vectorstores/memory which is no longer exported in v1.x

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export class MemoryVectorStore {
  constructor(embeddings) {
    this.embeddings = embeddings;
    this.documents = [];
    this.vectors = [];
  }

  static async fromDocuments(documents, embeddings) {
    const store = new MemoryVectorStore(embeddings);
    await store.addDocuments(documents);
    return store;
  }

  async addDocuments(documents) {
    const texts = documents.map((d) => d.pageContent);
    const vectors = await this.embeddings.embedDocuments(texts);
    this.vectors.push(...vectors);
    this.documents.push(...documents);
  }

  async similaritySearchWithScore(query, k = 4) {
    const queryVector = await this.embeddings.embedQuery(query);
    const results = this.documents.map((doc, i) => ({
      doc,
      score: 1 - cosineSimilarity(queryVector, this.vectors[i]),
    }));
    results.sort((a, b) => a.score - b.score);
    return results.slice(0, k).map((r) => [r.doc, r.score]);
  }

  async similaritySearch(query, k = 4) {
    const results = await this.similaritySearchWithScore(query, k);
    return results.map(([doc]) => doc);
  }

  asRetriever(options = {}) {
    const { k = 4 } = options;
    const store = this;
    return {
      invoke: async (query) => {
        return store.similaritySearch(query, k);
      },
    };
  }
}
