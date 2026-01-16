// Inject 注入
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 使用 @Inject 拿到刚才定义的连接池
  constructor(
    // 注入 PG_CONNECTION 连接池
    @Inject('PG_CONNECTION') private readonly db: any, 
    private readonly appService: AppService
  ) {}

  @Get('db-test')
  async testConnection() {
    try {
      // 执行一个最简单的 SQL 语句
      const res = await this.db.query('SELECT NOW() as current_time');
      
      return {
        status: '连接成功！',
        data: res.rows[0],
      };
    } catch (error) {
      return {
        status: '连接失败',
        error: error.message,
      };
    }
  }

  @Get('users')
  async getAllUsers() {
    try {
      const res = await this.db.query('SELECT * FROM users');
      return {
        success: true,
        data: res.rows,
      };
    } catch (error) {
      return {
        success: false,
        message: '查询用户失败',
        error: error.message,
      };
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
