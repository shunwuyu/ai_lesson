import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { TodosModule } from './todos/todos.module';

// 模块装饰器 
// 酒店的例子 希尔顿酒店
@Module({
  // 引入的模块
  imports: [TodosModule], 
  // 客人来了 check in  有没有订 要求 大床 还是双床
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
