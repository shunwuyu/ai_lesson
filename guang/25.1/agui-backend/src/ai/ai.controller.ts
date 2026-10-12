import { BadRequestException, Body, Controller, Post,  Res } from '@nestjs/common';
import type { Response } from 'express';
import { AiService } from './ai.service';
import { 
  // 把 AI SDK 标准消息流，直接封装成符合 HTTP SSE 协议的 Web Response 对象返回给前端。
  pipeUIMessageStreamToResponse, 
  // Vercel AI SDK 统一定义的聊天消息类型，前后端通用，承载对话文本、工具调用信息，供`useChat`和后端转换使用。
  UIMessage 
} from 'ai';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
    本地测试：
    curl -N -sS -X POST 'http://localhost:3000/ai/chat' \
      -H 'Content-Type: application/json' \
      -d '{"messages":[{"id":"1","role":"user","parts":[{"type":"text","text":"北京今天的天气"}]}]}'
   */
  // 这里手动拿 express 的 res，用`pipeUIMessageStreamToResponse`直接把流转 SSE
  //  写进响应，底层自动处理 SSE，就不用额外 SSE 装饰器。
  @Post('chat')
  async postChat(
    @Body() body: { messages?: UIMessage[] },
    // 这里 passthrough: false 是为了确保响应体被写入 res 中，而不是被 NestJS 处理。
    @Res({ passthrough: false }) res: Response,
  ): Promise<void> {
    if (!body?.messages || !Array.isArray(body.messages)) {
      throw new BadRequestException('Invalid JSON');
    }

    const stream = await this.aiService.stream(body.messages);
    // 设置 HTTP 响应头
    // 监听传入的 AI SDK 标准消息流
    // 将流内消息、工具调用事件，按 SSE `data: xxx\n\n` 规范序列化打包。
    pipeUIMessageStreamToResponse({ response: res, stream });
  }
}
