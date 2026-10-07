import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { SpeechModule } from './speech/speech.module';

@Module({
  imports: [
    AiModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SpeechModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
