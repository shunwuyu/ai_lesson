import { Controller, Get, Query, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

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
