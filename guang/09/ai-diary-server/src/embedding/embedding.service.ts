import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from '@langchain/openai';

@Injectable()
export class EmbeddingService {
  private embeddings: OpenAIEmbeddings;

  constructor(private config: ConfigService) {
    this.embeddings = new OpenAIEmbeddings({
      apiKey: this.config.get<string>('OPENAI_API_KEY'),
      model: this.config.get<string>('EMBEDDINGS_MODEL_NAME'),
      dimensions: this.config.get<number>('VECTOR_DIM'),

      configuration: {
        baseURL: this.config.get<string>('OPENAI_BASE_URL'),
      },
    });
  }

  async createEmbedding(text: string): Promise<number[]> {
    return this.embeddings.embedQuery(text);
  }
}