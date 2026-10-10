import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { SpeechModule } from './speech/speech.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public')
    }),
    // 引入事件模块，用于事件通知
    EventEmitterModule.forRoot({
      maxListeners: 200 // 最大监听器数量，默认 10
    }),
    SpeechModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
