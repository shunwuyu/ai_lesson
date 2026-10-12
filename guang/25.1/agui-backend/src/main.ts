import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // 生产环境改成你的前端域名，例如 'http://localhost:5173'
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
