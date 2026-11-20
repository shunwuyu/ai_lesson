import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUser } from './auth-user.interface';
import { ROLES_KEY } from './decorators/roles.decorator';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { RoleCodeValue } from '../common/constants/roles';

/**
 * 角色守卫
 *
 * <p>在 {@link JwtAuthGuard} 之后执行（同为 APP_GUARD，按注册顺序：先 JWT、后 Roles）。</p>
 *
 * <p>规则：</p>
 * <ul>
 *   <li>接口未标 {@link Roles} → 放行（仅要求已登录）</li>
 *   <li>接口标了 {@code @Roles('ROLE_REVIEWER', ...)} → request.user.roles 须命中其一</li>
 *   <li>不满足 → 403 权限不足</li>
 * </ul>
 *
 * <p>示例：文档审核 approve/reject 需 {@code ROLE_REVIEWER} 或 {@code ROLE_ADMIN}。</p>
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredRoles = this.reflector.getAllAndOverride<RoleCodeValue[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: AuthUser }>();
    const user = request.user;
    if (!user?.roles?.length) {
      throw new ForbiddenException('权限不足');
    }
    // 检查用户是否有任意一个角色
    const ok = requiredRoles.some((role) => user.roles.includes(role));
    if (!ok) {
      throw new ForbiddenException('权限不足');
    }
    return true;
  }
}
