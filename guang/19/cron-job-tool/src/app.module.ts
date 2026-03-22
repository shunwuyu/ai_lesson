import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 配置邮件服务 
    // 异步动态配置模块
    MailerModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService:ConfigService) => ({
            // transport 传输方式
            transport: {
                // 邮件主机
                host: configService.get<string>('MAIL_HOST'),
                // 邮件端口
                port: Number(configService.get<string>('MAIL_PORT')),
                // 是否使用 SSL/TLS
                secure: configService.get<string>('MAIL_SECURE') === 'true',
                // 邮件认证
                auth: {
                    // 邮件用户名
                    user: configService.get<string>('MAIL_USER'),
                    // 
                    pass: configService.get<string>('MAIL_PASS'),
                }
            },
            defaults: {
                // 默认发件人
                from: configService.get<string>('MAIL_FROM'),
            }
        })
    }),
    ServeStaticModule.forRoot({
      // __dirname 是当前文件的目录
      rootPath: join(__dirname, '..', 'public'),
    }),
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
