import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common'; 
// 引入 Nest.js 控制器装饰器 Get 方法 装饰器
import { AppService } from './app.service'; // 引入 app 服务 分层

@Controller()
export class AppController {
  // 引入 app 服务 分层
  // 依赖NestJS 的依赖注入机制， 自动把 AppService 实例注入进来
  constructor(private readonly appService: AppService) {
    console.log(this.appService, '///////???')
  }
  // / 控制器会调用 getHello 方法响应
  // 控制器负责处理参数，权限校验等
  // 再调用 appService.getHello() 方法返回字符串
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('welcome') // 新增：对应 GET /welcome
  getWelcome(){
    return this.appService.getWelcome(); // 调用服务里的新方法
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    // 校验逻辑
    if (!username || username.trim() === '') {
      throw new BadRequestException('用户名不能为空');
    }
    if (!password || password.length <= 6) {
      throw new BadRequestException('密码必须大于6位');
    }

    // 调用服务层处理登录（这里只是模拟）
    return this.appService.handleLogin(username, password);
  }
}
