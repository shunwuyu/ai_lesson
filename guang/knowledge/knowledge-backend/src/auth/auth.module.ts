import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // 引入 UserModule 模块，用于操作用户表
  // 异步注册 Jwt 模块
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // 盐
        secret: config.get<string>('JWT_SECRET', 'dev-secret-change-me'),
      }),
    }),
    UserModule
  ],
  controllers: [
    AuthController
  ],
  providers: [AuthService],
  // 导出 AuthService，用于在其他模块中使用
  // 导出 UserModule，用于在其他模块中使用
  // 因为 AuthService 中使用了 UserModule 中的 UserService，
  // 所以需要导出 UserModule
  // 才能使用 UserService 中的方法
  exports: [AuthService, UserModule]
})
export class AuthModule {}
