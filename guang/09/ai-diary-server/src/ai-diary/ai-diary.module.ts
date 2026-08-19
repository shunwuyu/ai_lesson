import { Module } from '@nestjs/common';
// TypeOrmModule 是 NestJS 与 TypeORM 的 桥接模块
// 把数据库连接和实体（Entity）注册进 Nest 
// 依赖注入体系，让你在 service 里直接注入 
// Repository 操作数据库。
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiDiary } from './entities/ai-diary.entity';
import { AiDiaryController } from './ai-diary.controller';
import { AiDiaryService } from './ai-diary.service';
import { MilvusModule } from '../milvus/milvus.module';
import { EmbeddingModule } from '../embedding/embedding.module';

@Module({
  imports: [
    // forFeature([AiDiary]) 是 按需注册实体 
    // ：把 AiDiary 这个实体在这个模块里登记，
    // TypeORM 才会为它生成对应的 Repository 
    // ，你就能在 service 里注入 
    // @InjectRepository(AiDiary) 来查这张表。
    TypeOrmModule.forFeature([AiDiary]),
    MilvusModule,
    EmbeddingModule,
  ],
  controllers: [AiDiaryController],
  providers: [AiDiaryService],
})
export class AiDiaryModule {}