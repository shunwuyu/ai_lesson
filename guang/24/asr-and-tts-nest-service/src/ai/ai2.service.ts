import { Inject, Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import type { Runnable } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class AiService {
  private readonly chain: Runnable;

  constructor(
    @Inject('CHAT_MODEL') model: ChatOpenAI
  ) {
    const prompt = PromptTemplate.fromTemplate(
      '请回答以下问题: \n\n{query}',
    );
    // 创建链，将提示、模型、输出符连接起来。
    // 可以通过 stream 方法获取流式输出。
    // 可以通过 run 方法获取同步输出。
    // 可以通过 pipe 方法将链连接起来，形成一个更大的链。
    this.chain = prompt.pipe(model).pipe(new StringOutputParser());
  }
  // * 是 异步生成器函数，用于返回一个异步可迭代对象。
  // 普通`async`函数**只能返回一次结果**（Promise），一次性把全部数据给你。
  // 大模型流式是**一块一块陆续出来**，需要一边来一边往外吐数据，普通 async 做不到。
  // `await` 是**等待别人给你数据**，不是**把数据输出出去**。
  async *streamChain(query: string): AsyncGenerator<string> {
    const stream = await this.chain.stream({ query });
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
