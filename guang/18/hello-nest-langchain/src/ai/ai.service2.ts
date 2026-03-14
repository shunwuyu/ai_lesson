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
    // 创建一个 chain，chain 是 LangChain 的核心概念，
    // 相当于一个流水线，把 prompt 和 model 串起来，形成一个完整的流程
    // prompt.pipe(model) 把 prompt 和 model 串起来
    // .pipe(new StringOutputParser()) 把输出转换成字符串
    this.chain = prompt.pipe(model).pipe(new StringOutputParser());
  }

  async runChain(query: string): Promise<string> {
    // this.chain.invoke 执行 chain，返回一个 Promise 对象
    return this.chain.invoke({ query });
  }
}