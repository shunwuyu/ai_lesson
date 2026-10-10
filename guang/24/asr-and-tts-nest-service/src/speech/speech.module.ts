import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpeechService } from './speech.service';
import { SpeechController } from './speech.controller';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import { TtsRelayService } from './tts-relay.service';

const AsrClient = tencentcloud.asr.v20190614.Client;

@Module({
  providers: [
    SpeechService,
    TtsRelayService,
    // 初始化 AS云 ASR 客户端，用于语音识别
    {
      provide: 'ASR_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new AsrClient({
          credential: {
            secretId: configService.get<string>('SECRET_ID'),
            secretKey: configService.get<string>('SECRET_KEY'),
          },
          region: 'ap-shanghai',
          profile: {
            httpProfile: {
              reqMethod: 'POST',
              reqTimeout: 30,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [SpeechController],
  // 别的模块导入 `SpeechModule`，就能注入使用 `TtsRelayService`。
  exports: [TtsRelayService],
})
export class SpeechModule {}
