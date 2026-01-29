// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 假设你已有 PrismaService
// JwtService 只负责「生成（签名）」和「解析（验签）
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
// import dotenv from 'dotenv';
// dotenv.config();


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 封装：生成双 Token 的公共方法
  private async generateTokens(id: string, name: string) {
    // sub 是 JWT 标准中约定的「主题（subject）」字段
    // 对应的唯一主体标识（这里就是用户 ID）
    // 具备通用性和可读性，方便后续解析令牌时快速获取用户核心标识。
    const payload = { sub: id, name };
    console.log(process.env.TOKEN_SECRET, "??????");
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '1m',
        secret: process.env.TOKEN_SECRET,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.TOKEN_SECRET,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }


   async login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { name } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const tokens = await this.generateTokens(user.id.toString(), user.name);

    return {
      ...tokens,
      user: {
        id: user.id.toString(),
        name: user.name,
      },
    };
  }

  // 新增：刷新 Token 的逻辑
  async refreshToken(rt: string) {
    try {
      // 1. 验证 Refresh Token 是否有效
      const payload = await this.jwtService.verifyAsync(rt, {
        secret: process.env.TOKEN_SECRET,
      });

      // 2. 这里的 payload 包含了 sub(id) 和 username
      // 生产环境通常还会去数据库查一下用户是否存在，或校验 RT 是否在黑名单
      
      // 3. 签发新的双 Token
      return this.generateTokens(payload.sub, payload.name);
    } catch (e) {
      // 如果验证失败（过期或伪造），抛出异常
      throw new UnauthorizedException('Refresh Token 已失效，请重新登录');
    }
  }
}