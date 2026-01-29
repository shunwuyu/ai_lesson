// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // 显式指定该接口返回的 HTTP 状态码为 200
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // 新增：刷新 Token 接口
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token missing');
    }
    const refreshToken = authHeader.substring(7); // 去掉 'Bearer '
    return this.authService.refreshToken(refreshToken);
  }
}