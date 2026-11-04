import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ImageStoreService } from './image-store.service';
import { OssService } from './oss.service';

@Module({
  controllers: [AiController],
  providers: [AiService, OssService, ImageStoreService],
})
export class AiModule {}
