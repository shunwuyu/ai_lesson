import { Module } from '@nestjs/common';
import { UserCreateModule } from './create/user-create.module';
import { UserEntitySubsciber } from './entities/user.entity.subscriber';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // 依赖项 配置特定的数据实体 forFeature 只关心当前实体
  imports: [UserCreateModule, TypeOrmModule.forFeature([UserEntity])],
  // 导出可供其它模块使用
  exports: [TypeOrmModule],
  // 当前模块提供的服务
  providers: [UserEntitySubsciber]
})
export class UserModule {}
