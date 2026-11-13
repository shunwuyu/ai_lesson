// 放通用装饰器、异常等通用工具
import { Module } from '@nestjs/common';
// 依赖注入、全局守卫、APP_GUARD
// 引入 APP_GUARD 用于全局守卫
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
// NestJS 官方提供的 JwtModule，用于快速集成 JWT 签发、解析、校验 Token 能力。
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionsGuard } from './permissions.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // 引入 UserModule 模块，用于操作用户表
  // 异步注册 Jwt 模块
  imports: [
    JwtModule.registerAsync({
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
  providers: [
    AuthService,
    // `JwtStrategy` 是 passport-jwt 的校验策略，负责**提取并校验 
    // accessToken，校验通过后把用户信息挂载到 request.user**，配合 AuthGuard ('jwt') 做鉴权。
    
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // `APP_GUARD` 是 nest 内置特殊 token，以此注册的守卫会被框架自动注册为全局守卫，对所有路由生效。
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  // 导出 AuthService，用于在其他模块中使用
  // 导出 UserModule，用于在其他模块中使用
  // 因为 AuthService 中使用了 UserModule 中的 UserService，
  // 所以需要导出 UserModule
  // 才能使用 UserService 中的方法
  exports: [AuthService, UserModule]
})
export class AuthModule {}
