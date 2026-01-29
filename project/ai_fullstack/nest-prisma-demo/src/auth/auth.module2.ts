// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
//nestjs内置jwt 模块 在应用中统一配置和使用 JWT
// （JSON Web Token）的签发与验证功能
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
console.log(process.env.TOKEN_SECRET, "///////???")
@Module({
  // 需要签发和验证JWT
  // 注册 JWT 模块。
  imports: [JwtModule.register({
    secret: process.env.TOKEN_SECRET // 加盐
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [] 
  // JwtStrategy 是用于在请求中自动解析并认证 JWT 的逻辑
})
export class AuthModule {}