import {
  Injectable
} from '@nestjs/common';
import {
  OpenAIEmbeddings
} from '@langchain/openai'
import * as fs from 'fs/promises';
import path from 'path';

interface Post {
  title: string;
  category: string;
  embedding: number[];
}

export function cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normV1 * normV2);
}


@Injectable()
export class SearchService {
  private embeddings: OpenAIEmbeddings;
  private posts: Post[] = [];
  constructor(
  ) {
    this.embeddings = new OpenAIEmbeddings({
      configuration:{
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL
      },
      model: 'text-embedding-ada-002'
    });
    this.loadPosts();
  }
  private async loadPosts() {
    // console.log(__dirname, "/////")
    try {
      const filePath = path.join(__dirname, '../../', 'data', 'posts_with_embedding.json');
      const data = await fs.readFile(filePath, 'utf-8');
      // console.log(data, "////////");
      this.posts = JSON.parse(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
      this.posts = [];
    }
  }

  async search(keyword: string, topK = 3) {
    console.log(keyword)
    // const embeddings = this.embeddings.embedQuery(keyword);
    const vector = await this.embeddings.embedQuery(keyword);
    console.log(vector);
    // console.log(cosineSimilarity(vector, this.posts[0].embedding));
    // return 
    // 2. 计算每个帖子的相似度
    const results = this.posts
      .map((post) => ({
        ...post,
        similarity: cosineSimilarity(vector, post.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity) // 降序：越相似越靠前
      .slice(0, topK);
    console.log(results, "------");
    const data = results.map((item) => item.title);
    // 3. 返回结构化结果（可根据前端需要调整）
    return {
      code: 0,
      data
    }
  }
}
