import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { AiDiaryService } from './ai-diary.service';
import { CreateAiDiaryDto } from './dto/create-ai-diary.dto';
import { UpdateAiDiaryDto } from './dto/update-ai-diary.dto';
import { SearchAiDiaryDto } from './dto/search-ai-diary.dto';

@Controller('ai-diary')
export class AiDiaryController {
  constructor(private readonly service: AiDiaryService) {}

  @Post()
  create(@Body() dto: CreateAiDiaryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAiDiaryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('search')
  search(@Body() dto: SearchAiDiaryDto) {
    return this.service.search(dto.content);
  }
}