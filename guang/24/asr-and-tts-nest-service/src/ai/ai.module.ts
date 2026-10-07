import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
// Nest 配置服务，读取.env 环境变量，统一拿配置参数，支持类型提示。
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    {
      provide: 'CHAT_MODEL',
      // useFactory 就是延后创建对象，等 inject 里的 ConfigService 准备好，拿到环境变量，再执行函数 new 出 ChatOpenAI 实例。
      // 工厂模式，由框架调用工厂函数生成对象，把对象创建交给函数，而非直接 new。
      // 工厂模式属于创建型设计模式，定义一个创建对象的接口，由子类或工厂函数决定实例化哪一个类，将对象创建与使用分离。
      // 统一封装模型实例，业务层只需注入使用，隔离初始化逻辑，便于切换模型、统一修改配置。
      useFactory: (configService: ConfigService) => {
        return new ChatOpenAI({
          model: configService.get('MODEL_NAME'),
          apiKey: configService.get('OPENAI_API_KEY'),
          configuration: {
            baseURL: configService.get('OPENAI_BASE_URL'),
          },
        });
      },
      inject: [ConfigService], // 注入配置服务，获取环境参数。
    }
  ]
})
export class AiModule {}
