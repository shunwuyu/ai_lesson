import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

@Module({
  controllers: [AiController],
  providers: [AiService, 
    // 动态注入 ChatModel， 自定义 provider 名称 CHAT_MODEL
    {
      provide: 'CHAT_MODEL',
      // 使用 useFactory 动态创建 ChatModel
      // 像个加工厂，读配置做原料，产出能用的 CHAT_MODEL 实例
      useFactory: (configService: ConfigService)=> {
        return new ChatOpenAI({
          modelName: configService.get('MODEL_NAME'),
          apiKey: configService.get('OPENAI_API_KEY'),
          configuration: {
            baseURL: configService.get('OPENAI_BASE_URL')
          }
        })
      },
      // 注入 ConfigService，这样在运行时可以获取配置
      inject: [ConfigService]
    }
  ],
})
export class AiModule {}
