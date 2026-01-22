// UseGuards 是一个装饰器, 用来给路由添加守卫（Guard）
// 控制是否允许请求继续处理。比如可以用来做权限验证或登录检查。
// 守卫会判断用户是否有权访问某个接口，如果没权限就直接拒绝，
// 不再执行后面的逻辑，保障系统安全。
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // AuthGuard 不是直接“引入”你的策略，而是通过名字在 Nest 的依赖注入系统中动态查找并使用它。
  @Post()
  @UseGuards(AuthGuard('jwt'))
  newPost(@Request() req) {
    console.log(req, req?.user, "//////");
    return req.user
  }
}
