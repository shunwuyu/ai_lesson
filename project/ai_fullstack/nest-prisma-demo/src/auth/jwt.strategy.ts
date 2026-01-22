// jwt.strategy.ts
// Strategy 是用于定义 JWT 鉴权逻辑的策略类；
// ExtractJwt 提供方法（如从 Bearer Token 中）提取 JWT 令牌。
import { ExtractJwt, Strategy } from 'passport-jwt';
// 将 Passport 的策略（如 JWT、Local）封装成可被依赖注入的提供者。
import { PassportStrategy } from '@nestjs/passport';
// 当作“服务”来创建和提供
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET || "", 
    });
  }

  async validate(payload: any) {
    // 这里可以添加用户查询逻辑
    console.log(payload, "/////");
    return { id: payload.sub, name: payload.name };
  }
}