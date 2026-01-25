import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 这个 app 实例其实是基于 Express 的 可以使用中间件
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  // 1. 添加这一行：设置全局前缀
  app.setGlobalPrefix('api');

  // 👇 关键：全局启用验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      // 自动过滤 DTO 未定义的属性
    // forbidNonWhitelisted: true, // 遇到未定义属性直接报错（可选）
    transform: true,      // 自动转换类型（如 string → number）
  }));

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();