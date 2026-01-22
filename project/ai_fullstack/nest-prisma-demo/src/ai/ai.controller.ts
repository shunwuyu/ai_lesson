import { Controller, Post, Body } from '@nestjs/common';
import AIService from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private readonly AIService: AIService) {}

  @Post('chat')
  async chat(@Body('prompt') prompt: string) {
    const result = await this.AIService.chat(prompt);
    return { result };
  }
}
