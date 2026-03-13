import { Injectable } from'@nestjs/common';
import { ChatOpenAI } from'@langchain/openai';
import { PromptTemplate } from'@langchain/core/prompts';
import type { Runnable } from'@langchain/core/runnables';
import { StringOutputParser } from'@langchain/core/output_parsers';

@Injectable()
export class AiService {
  private readonly chain: Runnable;

constructor() {
    const prompt = PromptTemplate.fromTemplate(
      '请回答以下问题：\n\n{query}',
    );
    const model = new ChatOpenAI({
      temperature: 0.7,
      modelName: 'qwen-plus',
      apiKey: 'sk-823e0cc7366545ec855fc57efd44730a',
      configuration: {
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
      },
    });
    this.chain = prompt.pipe(model).pipe(new StringOutputParser());
  }

async runChain(query: string): Promise<string> {
    return this.chain.invoke({ query });
  }
}