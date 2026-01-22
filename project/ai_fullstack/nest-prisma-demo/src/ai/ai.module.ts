import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';

@Module({
  controllers: [AIController],
  providers: [AIService],
  exports: [AIService],
})
export class AIModule {}
