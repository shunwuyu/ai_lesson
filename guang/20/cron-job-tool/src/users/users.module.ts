import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // 其他模块也可以注入这个Service
  exports: [UsersService],
})
export class UsersModule {}
