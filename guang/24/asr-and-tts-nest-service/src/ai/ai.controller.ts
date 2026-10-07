import { Controller, Get, Query, Sse } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { AiService } from './ai.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AI_TTS_STREAM_EVENT, type AiTtsStreamEvent } from '../common/stream-events';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  // `@Sse` 默认是 **GET 请求**，浏览器 SSE 只支持 GET。
  // Nest 装饰器，把接口标记为 SSE 接口，向客户端建立长连接，持续推送流式事件数据。
  @Sse('chat/stream') // 聊天流接口，用于实时接收模型回复。
  chatStream(
    @Query('query') query: string,
    @Query('ttsSessionId') ttsSessionId?: string,// 语音合成会话ID，用于关联TTS会话。
  ): Observable<{ data: string }> {
    const sessionId = ttsSessionId?.trim();
    if (sessionId) {
      const startEvent: AiTtsStreamEvent = { type: 'start', sessionId, query };
      this.eventEmitter.emit(AI_TTS_STREAM_EVENT, startEvent);
    }
    // 把异步迭代器（大模型流式返回）转成 RxJS 的 Observable 可观察流，适配 SSE。
    return from(this.aiService.streamChain(query, sessionId)).pipe(
      map((chunk) => ({ data: chunk })),
    );
  }
}