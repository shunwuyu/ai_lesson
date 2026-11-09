import { 
  Injectable,
  UnauthorizedException 
} from '@nestjs/common';
// 注入 Repository 仓库实例
import { InjectRepository } from '@nestjs/typeorm';
// 引入用户实体类
import { UserEntity } from './entities/user.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { RoleEntity } from './entities/role.entity';
// 引入 TypeORM 相关类型
import { In, Repository } from 'typeorm';
import { AuthUser } from '../auth/auth-user.interface';
// 引入 bcryptjs 库 compare 函数用于比较密码
// hash 函数用于对密码进行哈希处理
// 哈希处理后，密码就会被加密，无法直接比较
import { compare, hash } from 'bcryptjs';
// 引入 PermissionService 用于获取用户权限
import { PermissionService } from './permission.service';

@Injectable()
export class UserService {
  constructor(
    // 告诉 Nest，给我注入**UserEntity 这张表对应的
    //  Repository 仓库实例**，之后用 userRepo 就能操作用户表。
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepo: Repository<UserRoleEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    // 注入 PermissionService 用于获取用户权限
    private readonly permissionService: PermissionService,
  ) {

  }

  async validateCredentials(
    username: string,
    password: string,
  ){
    const user = await this.findByUsername(username);
    console.log(user, '???????????????');
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    if (user.status !== 1) {
      throw new UnauthorizedException('账户已禁用');
    }

    if (user.emailVerified === 0) {
      throw new UnauthorizedException('账户未激活，请先验证邮箱');
    }

    const ok = await compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    const roles = await this.getRoleCodes(user.id);
    console.log(roles, '---------------------')
    const permissions = await this.permissionService.getUserPermissionCodes(user.id);

  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({
      where: { username, deleted: false },
    });
  }

  async getRoleCodes(userId: string): Promise<string[]> {
    const rows = await this.userRoleRepo
      // 手动拼 SQL 的工具, 复杂查询这么干
      // ur 就是给 userRoleRepo 对应的这张表起的**简短别名**
      .createQueryBuilder('ur')
      // 内连接角色表 内连接就是只取出两边表能匹配上的数据，匹配不上的直接扔掉。
      .innerJoin(RoleEntity, 'r', 'r.id = ur.role_id')
      // `:userId` 是占位符
      .where('ur.user_id = :userId', { userId })
      // 只取状态为 1 的角色 有效角色
      .andWhere('r.status = 1')
      // 只取角色编码
      .select('r.role_code', 'roleCode')
      // 数据库原多条生行数据
      .getRawMany<{ roleCode: string }>();
    return rows.map((r) => r.roleCode);
  }
}
