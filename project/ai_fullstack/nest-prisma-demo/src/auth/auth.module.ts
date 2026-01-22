// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
//nestjs内置jwt 模块 在应用中统一配置和使用 JWT
// （JSON Web Token）的签发与验证功能
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // 注册 JWT 模块。
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}