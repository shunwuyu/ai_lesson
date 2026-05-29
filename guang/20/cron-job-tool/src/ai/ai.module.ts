import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { UsersModule } from '../users/users.module';
import { ToolModule } from '../tool/tool.module';

@Module({
  imports: [UsersModule, ToolModule],
  controllers: [AiController],
  providers: [
    AiService,
  ],
})
export class AiModule {}