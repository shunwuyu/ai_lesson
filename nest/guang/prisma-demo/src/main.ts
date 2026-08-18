import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// `ValidationPipe`是 NestJS 内置管道，配合 
// class‑validator/class‑transformer 实现请求参数自动
//  DTO 校验与对象转换。
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启dto参数校验
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤dto之外多余字段
      // {"name":"张三","password":"123456"}
      // transform=true：把普通 JS 对象**真正 new 成 DTO 类实例**，校验注解才生效
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
