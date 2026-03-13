import { Injectable, Inject } from'@nestjs/common';
import { ChatOpenAI } from'@langchain/openai';
import { PromptTemplate } from'@langchain/core/prompts';
import type { Runnable } from'@langchain/core/runnables';
import { StringOutputParser } from'@langchain/core/output_parsers';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AiService {
  private readonly chain: Runnable;

    constructor(@Inject(ConfigService) configService: ConfigService) {
        const prompt = PromptTemplate.fromTemplate(
        '请回答以下问题：\n\n{query}',
        );
        const model = new ChatOpenAI({
            temperature: 0.7,
            modelName: configService.get('MODEL_NAME'),
            apiKey: configService.get('OPENAI_API_KEY'),
            configuration: {
                baseURL: configService.get('OPENAI_BASE_URL')
            },
        });
        this.chain = prompt.pipe(model).pipe(new StringOutputParser());
    }

    async runChain(query: string): Promise<string> {
        return this.chain.invoke({ query });
    }
    // 生成器语法
    async *streamChain(query: string): AsyncGenerator<string> {
        const stream = await this.chain.stream({ query });
        for await (const chunk of stream) {
          yield chunk;
        }
    }
}