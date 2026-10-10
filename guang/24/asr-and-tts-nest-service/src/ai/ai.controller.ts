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
  // 处理聊天流请求
  @Sse('chat/stream')
  chatStream(@Query('query') query: string): Observable<{ data: string }> {
    // 观察者模式 
    // 观察者：发布者直接存观察者，双方知道彼此；发布订阅：中间有事件中心，两边互不认识。
    // from 将异步可迭代对象转换为 Observable 对象
    // pipe 对 Observable 进行操作，如映射、过滤、组合等
    // map 对 Observable 发出的每个值进行映射，添加 data 字段

    return from(this.aiService.streamChain(query)).pipe(
      // 对 Observable 发出的每个值进行映射，添加 data 字段
      map((chunk) => ({ data: chunk }))
    );
  }
}
