import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    // 统一初始化大模型实例，只创建一次。
    // 别的地方直接注入用，不用重复读配置、重复 new，方便复用和解耦。
    // 也方便替换别的模型。
    {
      provide: 'CHAT_MODEL',
      // NestJS 工厂函数，运行时执行函数生成实例，支持传入依赖，动态创建服务对象。
      // 可以注入别的依赖，适合需要动态配置才能 new 出来的实例。
      useFactory: (configService: ConfigService) => {
        return new ChatOpenAI({
          model: configService.get('MODEL_NAME'),
          apiKey: configService.get('OPENAI_API_KEY'),
          configuration: {
            baseURL: configService.get('OPENAI_BASE_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AiModule {}
