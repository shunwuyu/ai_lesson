import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import {
  ChatOpenAI
} from '@langchain/openai';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    // 使用useFactory 动态创建了一个provider 
    // 名字叫 CHAT_MODEL，值是一个 ChatOpenAI 实例
    // configService 是 ConfigService 的实例，全局注入
    // 工厂模式 可以生产汽车、摩托车、战时生产飞机
    {
      provide: 'CHAT_MODEL',
      // 注入 ConfigService 实例
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new ChatOpenAI({
          model: configService.get('MODEL_NAME'),
          apiKey: configService.get('OPENAI_API_KEY'),
          configuration: {
            baseURL: configService.get('OPENAI_BASE_URL'),
          },
        })
      }
    }
  ],
})
export class AiModule {}
