import {
  // 权限码守卫
  // `CanActivate` 是守卫的接口，用来让你写代码判断这个请求能不能放行通过。
  CanActivate,
  // 执行上下文
// ExecutionContext 是请求上下文，用来拿到当前请求、路由、控制器相关信息给守卫做判断。
  ExecutionContext,
  // 403 错误
  ForbiddenException,
  // 注入
  Injectable,
} from '@nestjs/common';
// Reflector 就是用来读取咱们用 SetMetadata 贴在路由上的那些标记元数据的工具。
// 在 Nest 里一般就叫它**反射器**，作用就是读取装饰器挂载的元数据。
import { Reflector } from '@nestjs/core';
import { AuthUser } from './auth-user.interface';
import { PERMISSIONS_KEY } from './decorators/require-permission.decorator';
import { RoleCode } from '../common/constants/roles';

/**
 * 权限码守卫（在 JwtAuthGuard、RolesGuard 之后执行）
 *
 * - 未标 @RequirePermission → 放行
 * - ROLE_ADMIN → 放行
 * - 否则 request.user.permissions 须命中其一
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  // 注入 Reflector 用于读取装饰器挂载的元数据
  // `Reflector` 是 Nest 自带的内置可注入服务，不需要你自己在模块 providers 里注册它。
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log(required, '-----------');
    if (!required?.length) {
      return true;
    }
    // 从请求上下文获取用户信息
    // `request.user` 是在 JwtAuthGuard 中设置的，包含用户信息和角色
    const request = context.switchToHttp().getRequest<{ user?: AuthUser }>();
    const user = request.user;
    console.log(user, '??????');
    if (!user) {
      throw new ForbiddenException('权限不足');
    }

    if (user.roles.includes(RoleCode.ADMIN)) {
      return true;
    }

    const owned = new Set(user.permissions ?? []);
    const ok = required.some((p) => owned.has(p));
    if (!ok) {
      throw new ForbiddenException('权限不足');
    }
    return true;
  }
}
