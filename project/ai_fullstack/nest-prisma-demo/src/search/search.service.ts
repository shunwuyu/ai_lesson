import {
  Injectable
} from '@nestjs/common';
import {
  OpenAIEmbeddings
} from '@langchain/openai'

@Injectable()
export class SearchService {
  private embeddings: OpenAIEmbeddings;
  constructor(
  ) {
    this.embeddings = new OpenAIEmbeddings({
      configuration:{
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL
      },
      model: 'text-embedding-ada-002'
    });
  }
  async search(keyword: string) {
    console.log(keyword)
    // const embeddings = this.embeddings.embedQuery(keyword);
    const vector = await this.embeddings.embedQuery(keyword);
    console.log(vector)
    return { keyword };
  }
}
