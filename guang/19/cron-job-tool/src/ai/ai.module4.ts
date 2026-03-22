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
import { MailerService } from '@nestjs-modules/mailer';

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
        // 使用useFactory 动态创建了一个provider 
        // 名字叫 QUERY_USER_TOOL，值是一个 tool 实例
        // userService 是 UserService 的实例，依赖注入
        // 需要引入
        provide: 'QUERY_USER_TOOL',
      useFactory: (userService: UserService) => {
          // 定义工具的输入参数 schema
          const queryUserArgsSchema = z.object({
            userId: z.string().describe('用户 ID，例如: 001, 002, 003'),
          });
          // 定义工具的函数
          return tool(
            
            async ({ userId }: { userId: string }) => {
                // 查询数据库中的用户信息
              const user = userService.findOne(userId);
                // 如果用户不存在，返回错误信息
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
      },
      {
        provide: 'SEND_MAIL_TOOL',
        useFactory: (mailerService: MailerService, configService: ConfigService) => {
            const sendMailArgsSchema = z.object({
                to: z.email().describe('收件人邮箱地址,例如: test@example.com'),
                subject: z.string().describe('邮件主题'),
                text: z.string().describe('纯文本内容，可选'),
                html: z.string().describe('HTML内容，可选'),
            })
            // 定义工具的函数
            return tool(
                // 定义工具的参数
                async ({to, subject, text, html}: {
                  to: string;
                  subject: string;
                  text?: string;
                  html?: string;
                }) => {
                    // fallbackFrom 是备用发件人
                  const fallbackFrom =
                    configService.get<string>('MAIL_FROM')
          
                  await mailerService.sendMail({
                    to,
                    subject,
                    text: text ?? '（无文本内容）',
                    html: html ?? `<p>${text ?? '（无 HTML 内容）'}</p>`,
                    from: fallbackFrom,
                  });
          
                  return`邮件已发送到 ${to}，主题为「${subject}」`;
                },
                {
                  name: 'send_mail',
                  description:
                    '发送电子邮件。需要提供收件人邮箱、主题，可选文本内容和 HTML 内容。',
                  schema: sendMailArgsSchema,
                },
            );
        },
        inject: [MailerService, ConfigService],
      }
  ],
})
export class AiModule {}
