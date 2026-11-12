import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
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

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  /** Passport 回调：无 user 或 Strategy 报错 → 401 */
  handleRequest<TUser>(err: Error | null, user: TUser): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException('未登录或 token 已失效');
    }
    return user;
  }
}
