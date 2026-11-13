import { 
  // 创建**自定义参数装饰器**
  createParamDecorator, 
  // 请求上下文，包含当前请求、控制器、方法等信息。
  ExecutionContext 
} from '@nestjs/common';
import { AuthUser } from '../auth-user.interface';

/** 从 request.user 取当前登录用户（需 JwtAuthGuard） */
export const CurrentUser = createParamDecorator(
  // _data 传参，这里没有。
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    // 把通用上下文切换成 HTTP 上下文，拿到 http 请求对象。
    const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    // 从请求对象里取用户信息。
    return request.user;
  },
);