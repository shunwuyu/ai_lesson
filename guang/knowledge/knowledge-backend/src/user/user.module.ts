import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { RoleService } from './role.service';
// import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { UserPermissionEntity } from './entities/user-permission.entity';
import { PermissionService } from './permission.service';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TeamModule,
    // 给当前模块注册**这几张表的仓库**
     TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      UserRoleEntity,
      PermissionEntity,
      UserPermissionEntity,
    ]),
  ],
  controllers: [UserController],
  // 注册PermissionService, 用户获取用户权限 
  providers: [UserService, PermissionService],
  // 导出UserService, 用于在其他模块中使用
  // 导出PermissionService
  exports: [UserService, PermissionService]
})
export class UserModule {}
