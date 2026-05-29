import { Controller, Get } from '@nestjs/common';

@Controller('cats') // 定义路径 /cats
export class CatsController {
  @Get() // 处理 GET 请求
  getAllCats() {
    return ['Tom', 'Jerry']; // 返回一个猫咪列表
  }
}