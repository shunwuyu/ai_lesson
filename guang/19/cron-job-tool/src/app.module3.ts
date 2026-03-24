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
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql'>('DB_TYPE') as any, // 类型断言或直接写 'mysql'
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        
        // 生产环境建议关闭 synchronize，这里根据环境变量控制
        synchronize: configService.get<boolean>('DB_SYNC') === true || configService.get<string>('DB_SYNC') === 'true',
        
        logging: configService.get<boolean>('DB_LOGGING') === true || configService.get<string>('DB_LOGGING') === 'true',
        
        // 驱动包
        connectorPackage: configService.get<string>('DB_DRIVER_PACKAGE') || 'mysql2',
        // 实体是数据库中的一个表的映射
        // 有了这个后可以自动加载实体 
        entities: [User],
      }),
    }),
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
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
