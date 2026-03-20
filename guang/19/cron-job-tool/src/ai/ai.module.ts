import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import {
  ChatOpenAI
} from '@langchain/openai';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { z } from 'zod';
import { tool} from '@langchain/core/tools';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    UserService,
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
    },
    {
        provide: 'QUERY_USER_TOOL',
      useFactory: (userService: UserService) => {
          const queryUserArgsSchema = z.object({
            userId: z.string().describe('用户 ID，例如: 001, 002, 003'),
          });
      
          return tool(
            async ({ userId }: { userId: string }) => {
              const user = userService.findOne(userId);
      
              if (!user) {
                const availableIds = userService
                  .findAll()
                  .map((u) => u.id)
                  .join(', ');
      
                return`用户 ID ${userId} 不存在。可用的 ID: ${availableIds}`;
              }
      
              return`用户信息：\n- ID: ${user.id}\n- 姓名: ${user.name}\n- 邮箱: ${user.email}\n- 角色: ${user.role}`;
            },
            {
              name: 'query_user',
              description:
                '查询数据库中的用户信息。输入用户 ID，返回该用户的详细信息（姓名、邮箱、角色）。',
              schema: queryUserArgsSchema,
            },
          );
        },
      inject: [UserService],
      }
  ],
})
export class AiModule {}
