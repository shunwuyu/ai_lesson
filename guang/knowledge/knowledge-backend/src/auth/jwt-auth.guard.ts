import {
  // 它是请求上下文，装着当前请求、控制器、方法这些信息，给守卫 / 拦截器拿。
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// `Reflector` 是 NestJS 提供的元数据反射工具，用于读取装饰器上的元数据。
// 这里用于读取 {@link Public} 元数据，判断是否为公开接口。
// Reflector 是 Nest 核心内置全局 provider，直接构造函数注入即可。
import { Reflector } from '@nestjs/core';
// `AuthGuard` 是 passport-jwt 的守卫，负责**校验 accessToken**。
import { AuthGuard } from '@nestjs/passport';
// `IS_PUBLIC_KEY` 是 {@link Public} 装饰器的元数据键，用于判断是否为公开接口。
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

/**
 * 全局 JWT 鉴权守卫
 *
 * <p>在 {@link AuthModule} 里通过 {@code APP_GUARD} 注册，默认所有 HTTP 接口都需要登录。</p>
 *
 * <p>执行顺序（canActivate）：</p>
 * <ol>
 *   <li>读 {@link Public} 元数据 → 公开接口直接放行（login / register / refresh）</li>
 *   <li>否则调用父类 {@link AuthGuard}('jwt') → 触发 {@link JwtStrategy}</li>
 * </ol>
 *
 * <p>验签失败或 validate 抛错时，{@link handleRequest} 统一转为 401。</p>
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  // `canActivate` 方法是守卫的核心，判断是否允许请求继续。
  // 如果是公开接口，直接放行。
  // 否则调用父类 `AuthGuard('jwt')`，触发 {@link JwtStrategy} 校验 accessToken。
  // 
  canActivate(context: ExecutionContext) {
    // 读取 {@link Public} 元数据，判断是否为公开接口。
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      // 拿到的是**当前要执行的路由方法函数本身**
      context.getHandler(),
      // 到控制器类本身（AuthController），用来读取控制器类上挂载的元数据。
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // 如果不是公开接口，调用父类 `AuthGuard('jwt')`，触发 {@link JwtStrategy} 校验 accessToken。
    // jwt.strategy.ts 接棒
    return super.canActivate(context);
  }

  /** Passport 回调：无 user 或 Strategy 报错 → 401 */
  // 走完 JwtStrategy 校验后，自动回调 handleRequest，拿到校验结果。
  // 返回的 user 交给 passport，最终赋值到 `req.user`，供 `@CurrentUser()` 读取。
  handleRequest<TUser>(err: Error | null, user: TUser): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException('未登录或 token 已失效');
    }
    return user;
  }
}
