import { Controller, Query, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('chat')
  async chat(@Query('query') query: string) {
      const answer = await this.aiService.runChain(query);
      return { answer };
  }
}
