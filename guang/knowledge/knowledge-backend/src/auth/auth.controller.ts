import { 
  Controller,
  Post,
  Body,
  Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthUser } from './auth-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    console.log(dto.refreshToken, '--------');
    return this.authService.refresh(dto.refreshToken);
  }

  /** 无状态 JWT：客户端丢弃 token 即可 */
  @Post('logout')
  logout() {
    return { message: '已退出登录' };
  }
  // 请求进来， 没有 `@Public()`，触发全局 APP_GUARD  Jwt 守卫。
  // passport-jwt 策略里的 `ExtractJwt`， 在jwt.strategy.ts定义
  // 取出 Bearer token 中的 accessToken
  // 拿到 payload，调用 JwtStrategy 的`validate(payload)`，查库组装 AuthUser，挂到`req.user`
  // `@CurrentUser()` 装饰器读取 `req.user` 注入入参
  // 进入 me 接口，调用 service 返回用户信息
  // 任意一步校验失败，直接抛出 401 Unauthorized
  @Get('me') 
  me(@CurrentUser() user: AuthUser) {
    console.log(user, '////+++++++++/////');
    return this.authService.getMe(user.userId);
  }

}
