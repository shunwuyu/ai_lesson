import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from './conversations/conversations.module';
import { User } from './conversations/entities/user.entity';
import { Conversation } from './conversations/entities/conversation.entity';
import { Message } from './conversations/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'hello_pg',
      username: 'user',
      password: '123456',
      synchronize: true, // 同步建表
      logging: true,  // 打印日志
      entities: [ User, Conversation, Message ]
    }),
    ConversationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
