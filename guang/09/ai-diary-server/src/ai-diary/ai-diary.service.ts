import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { AiDiary } from './entities/ai-diary.entity';
import { CreateAiDiaryDto } from './dto/create-ai-diary.dto';
import { UpdateAiDiaryDto } from './dto/update-ai-diary.dto';
import { MilvusService } from '../milvus/milvus.service';
import { EmbeddingService } from '../embedding/embedding.service';

@Injectable()
export class AiDiaryService {
  constructor(
    @InjectRepository(AiDiary)
    private repository: Repository<AiDiary>,

    private milvusService: MilvusService,
    private embeddingService: EmbeddingService,
  ) {}

  async create(dto: CreateAiDiaryDto) {
    const id = uuid();

    const diary = this.repository.create({
      id,
      ...dto,
    });

    await this.repository.save(diary);

    const vector = await this.embeddingService.createEmbedding(dto.content);

    await this.milvusService.insert({
      id,
      vector,
      content: dto.content,
      date: dto.date,
      mood: dto.mood,
      tags: dto.tags,
    });

    return diary;
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const diary = await this.repository.findOne({
      where: { id },
    });

    if (!diary) {
      throw new NotFoundException('Diary not found');
    }

    return diary;
  }

  async update(id: string, dto: UpdateAiDiaryDto) {
    const diary = await this.findOne(id);

    Object.assign(diary, dto);

    await this.repository.save(diary);

    await this.milvusService.delete(id);

    const vector = await this.embeddingService.createEmbedding(diary.content);

    await this.milvusService.insert({
      id,
      vector,
      content: diary.content,
      date: diary.date,
      mood: diary.mood,
      tags: diary.tags,
    });

    return diary;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.repository.delete(id);

    await this.milvusService.delete(id);

    return {
      message: '删除成功',
    };
  }

  async search(content: string) {
    const vector = await this.embeddingService.createEmbedding(content);

    return this.milvusService.search(vector);
  }
}