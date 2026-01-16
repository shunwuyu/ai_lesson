// src/app.module.ts
// 装饰器 买了手机， 贴膜，手机壳， 支架，
// 不改变手机本身，却能一层层给它增强功能或换个外观。
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    TodosModule,
    DatabaseModule
  ], // 👈 引入 todos 功能模块
  controllers: [AppController],// 👈 引入 app 控制器
  providers: [AppService], // 👈 引入 app 服务， 数据
})
export class AppModule {}
