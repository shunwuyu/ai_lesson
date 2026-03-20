import { Controller, Get, Query, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('chat')
  async chat(@Query('query') query: string) {
    const answer = await this.aiService.runChain(query);
    return { answer };
  }
  // 
  // @Sse 装饰器 表示这是一个 SSE 接口
  // Content-Type	text/event-stream
  // Cache-Control	no-cache
  // Connection	keep-alive
  // HTTP 协议会自动将其设为分块传输，确保数据是一块一块发出去的
  // Transfer-Encoding	chunked
  // 可观察对象 Observer 是 RxJS 中的一个概念，用于处理异步数据流
  @Sse('chat/stream')
  chatStream(@Query('query') query: string): Observable<MessageEvent> {
    // 调用 runChainStream 方法，返回一个 AsyncIterable<string>
    const stream = this.aiService.runChainStream(query);
    // from 将 AsyncIterable<string> 转换为 Observable<string>
    // pipe 管道操作符 用于处理 Observable<string>
    // map 改造
    return from(stream).pipe(
      map((chunk) => ({
        data: chunk,
      })),
    ) as Observable<MessageEvent>;
  }
}
