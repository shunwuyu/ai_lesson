import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

// 接待的归 controllers，干活的归
//  providers，要依赖别的模块就写进 imports 。

@Module({
  imports: [TodosModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
