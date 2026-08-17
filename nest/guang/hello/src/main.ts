import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启动web 服务， 3000 端口
  // ?? 是 空值合并运算符 es11
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
