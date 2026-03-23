import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // 导出 UsersService 供其它模块使用
  exports: [UsersService],
})
export class UsersModule {}
