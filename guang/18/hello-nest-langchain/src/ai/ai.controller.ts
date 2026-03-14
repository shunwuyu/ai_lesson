import { Controller, Query, Get, Sse} from '@nestjs/common';
import { AiService } from './ai.service';
// RxJS 把 JS 里的异步操作（如请求、事件）变成可操控的数据流，让异步处理更简洁可控
//
import { Observable, from, map } from 'rxjs';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('chat')
  async chat(@Query('query') query: string) {
      const answer = await this.aiService.runChain(query);
      return { answer };
  }
  // 处理服务器发送事件的装饰器，像水管一样，后端能持续给前端推数据，比如聊天消息实时流
//   Server-Sent Events
// Content-Type: text/event-stream; charset=utf-8
// 禁用缓存（确保前端拿到实时数据，不读缓存）
// Cache-Control: no-cache
// Connection: keep-alive
// Transfer-Encoding: chunked
// res.write(data)
// 
    @Sse('chat/stream')
    chatStream(@Query('query') query: string): Observable<{ data: string }> {
        // this.aiService.streamChain 流式输出，
        // 范型是<{ data: string }>
        // from 把一个 iterable 对象转换成 Observable 对象
        // pipe 管道，用于处理数据流
        // map 用于处理数据流中的每个数据
        return from(this.aiService.streamChain(query)).pipe(
            map((chunk) => ({ data: chunk }))
        );
    }
}
