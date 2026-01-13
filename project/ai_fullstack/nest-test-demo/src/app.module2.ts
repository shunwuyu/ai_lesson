import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Nest 通过模块把路由、逻辑和依赖组织在一起，既解耦又方便扩展，符合大型项目架构设计。
// @Module 就像一个“功能盒子说明书”
@Module({
  imports: [],
  // controllers 负责接收和分发请求
  controllers: [AppController],
  // providers 放的是被注入使用的业务能力
  providers: [AppService],
})
export class AppModule {}
