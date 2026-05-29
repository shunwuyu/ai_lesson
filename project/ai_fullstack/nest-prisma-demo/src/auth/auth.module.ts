// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
// JwtModule 是 NestJS 提供的用于集成 JWT（JSON Web Token）
// 功能的模块，支持令牌的签发与验证，便于实现身份认证和授权。集成到Auth模块
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
console.log(process.env.TOKEN_SECRET, "///////???")
@Module({
  // 注册 JWT 模块。
  imports: [JwtModule.register({
    secret: process.env.TOKEN_SECRET // 加盐
  })],
  controllers: [AuthController],
  // providers: [AuthService],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard] 
  // JwtStrategy 是用于在请求中自动解析并认证 JWT 的逻辑
})
export class AuthModule {}