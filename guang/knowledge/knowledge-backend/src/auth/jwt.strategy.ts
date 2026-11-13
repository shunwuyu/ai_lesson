import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// 引入 passport-jwt 策略
import { PassportStrategy } from '@nestjs/passport';
// 引入 passport-jwt 策略里的 ExtractJwt
// 从请求头里提取 JWT token
// Strategy 是 passport-jwt 策略里的 Strategy 类，用于验证 JWT token
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

interface JwtPayload {
  sub: string;
  username: string;
  type: 'access' | 'refresh';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      // 从请求头里提取 JWT token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 忽略过期时间，这里建议关闭，因为刷新 token 会过期
      ignoreExpiration: false,
      // 验证 JWT token 时使用的密钥
      secretOrKey: config.get<string>('JWT_SECRET', 'dev-secret-change-me'),
    });
  }
  // 验证 JWT token
  async validate(payload: JwtPayload) {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('无效的 access token');
    }
    return this.authService.buildAuthUser(payload.sub);
  }
}