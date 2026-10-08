import { Controller, Get, Query, Sse } from '@nestjs/common';
// 引入 RxJS 库，用于处理异步数据流。 Reactive Extensions for JavaScript
// Rx 就是一套处理源源不断数据流的标准
import { 
  from,  // 将异步可迭代对象转换为 Observable
  map,  // 对 Observable 发出的每个值进行映射
  Observable  // 异步数据流对象，用于处理异步事件
} from 'rxjs';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Sse('chat/stream')
  chatStream(@Query('query') query: string): Observable<{ data: string }> {
    return from(this.aiService.streamChain(query)).pipe(
      // 对 Observable 发出的每个值进行映射，添加 data 字段
      map((chunk) => ({ data: chunk }))
    );
  }
}
