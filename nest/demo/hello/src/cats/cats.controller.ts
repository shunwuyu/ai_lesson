import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    return this.catsService.findAll();
  }

  @Post()
  addCat(@Body() body) {
    return this.catsService.addCat(body.cat); // 调用服务的 addCat 方法
  }
}
