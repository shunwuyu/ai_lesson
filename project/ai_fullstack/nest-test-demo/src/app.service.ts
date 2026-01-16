import { Injectable } from '@nestjs/common';
// 可以被依赖注入 程序可以分配在任何项目中
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World222!';
  }
  // 新增：返回欢迎字符串
  getWelcome() {
    return { message: 'Welcome from Service!', code: 200 }; 
  }
  handleLogin(username: string, password: string) {
    return { message: 'Login handled!', code: 200 };
  }
}
