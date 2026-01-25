import { Controller, Post, Body, Res } from '@nestjs/common';
import { AIService } from './ai.service';
import { ChatDto } from './dto/chat.dto';
import type { Response } from 'express';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('chat')
  async chat(@Body() chatDto: ChatDto, @Res() res: Response) {
    // 设置响应头，保持和之前一样
    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // 注意：Vercel SDK 协议通常用 text/plain 或 text/event-stream
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      // 调用 Service
      await this.aiService.chat(chatDto.messages, (token) => {
        /**
         * 关键点：匹配图1的格式
         * 格式为：0:加JSON字符串化的内容再加换行符
         */
        res.write(`0:${JSON.stringify(token)}\n`);
      });

      // 传输结束标识（可选，根据你的前端库需求）
      // res.write(`d:{"finishReason":"stop"}\n`); 
      
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}