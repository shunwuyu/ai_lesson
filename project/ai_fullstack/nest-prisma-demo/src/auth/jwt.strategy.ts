// jwt.strategy.ts
// Strategy 是用于定义 JWT 鉴权逻辑的策略类；
// ExtractJwt 提供方法（如从 Bearer Token 中）提取 JWT 令牌。
import { ExtractJwt, Strategy } from 'passport-jwt';
// 将 Passport 的策略（如 JWT、Local）封装成可被依赖注入的提供者。
import { PassportStrategy } from '@nestjs/passport';
// 当作“服务”来创建和提供
import { Injectable } from '@nestjs/common';

// jwt.strategy.ts 就是给你的 Auth 模块定「JWT 验证的规矩」的。
// 没有它，JwtAuthGuard 只知道要做 JWT 验证，却不知道从哪提令牌、
// 用什么密钥验、验通过后怎么解析出用户信息，最后只能报错。它就是具体落地 JWT 验证细节、给 Guard 提供「执行手册」的核心文件。

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
    // 这个返回值，会被挂到 req.user 上
    console.log(payload, "/////");
    return { id: payload.sub, name: payload.name };
  }
}