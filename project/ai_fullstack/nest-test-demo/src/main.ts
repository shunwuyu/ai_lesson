// 创建和启动 Nest.js 应用实例的 “工厂”，是整个 Nest.js 应用的入口核心
// 在韩国三星什么都生产， 上到手机，汽车， 下到方便面，商场无所不包。韩国就是一家公司。
import { NestFactory } from '@nestjs/core';
// 引入应用模块，它是 Nest.js 应用的根模块. nestjs 模块化架构
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  // 用 NestFactory 创建应用实例（核心作用）
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // ES2020 es11 空值合并运算符
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
