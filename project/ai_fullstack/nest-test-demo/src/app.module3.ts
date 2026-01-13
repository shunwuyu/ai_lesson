// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule], // 👈 引入 todos 功能模块
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
