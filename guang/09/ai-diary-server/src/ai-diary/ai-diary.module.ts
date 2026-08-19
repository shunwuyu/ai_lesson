import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiDiary } from './entities/ai-diary.entity';
import { AiDiaryController } from './ai-diary.controller';
import { AiDiaryService } from './ai-diary.service';
import { MilvusModule } from '../milvus/milvus.module';
import { EmbeddingModule } from '../embedding/embedding.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiDiary]),
    MilvusModule,
    EmbeddingModule,
  ],
  controllers: [AiDiaryController],
  providers: [AiDiaryService],
})
export class AiDiaryModule {}