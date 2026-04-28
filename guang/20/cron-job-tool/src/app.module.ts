import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// entities 是数据库表的映射实体，用来定义表结构，让 ORM 把类和数据库表一一对应。
import { User } from './users/entities/user.entity';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'hello',
      entities: [User],
      connectorPackage: 'mysql2',
      logging: true,
      synchronize: true,
    }),
    UsersModule,
    AiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
