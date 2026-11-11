import {
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermissionEntity } from './entities/user-permission.entity';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { RoleEntity } from './entities/role.entity';
import {
  ADMIN_OPERATION_PERMISSIONS,
  ADMIN_ROLES,
} from '../common/constants/permissions';


@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(UserPermissionEntity)
    private readonly userPermRepo: Repository<UserPermissionEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepo: Repository<UserRoleEntity>,
  ) {

  }

  async getUserPermissionCodes(userId: string) {
    // 直接给用户赋的权限
    const direct = await this.userPermRepo
      .createQueryBuilder('up')
      .innerJoin(PermissionEntity, 'p', 'p.id = up.permission_id')
      .where('up.user_id = :userId', { userId })
      .andWhere('p.status = 1')
      .andWhere('p.deleted = false')
      .select('p.permission_code', 'code')
      .getRawMany<{ code: string }>();
    console.log(direct, '//////')
    // 通过角色赋的权限
    const viaRole = await this.userRoleRepo
      .createQueryBuilder('ur')
      // 通过用户角色关联权限
      .innerJoin(RolePermissionEntity, 'rp', 'rp.role_id = ur.role_id')
      // 通过角色权限关联权限
      .innerJoin(PermissionEntity, 'p', 'p.id = rp.permission_id')
      .where('ur.user_id = :userId', { userId })
      .andWhere('p.status = 1')
      .andWhere('p.deleted = false')
      // 去重
      // 一个用户可能绑定多个角色，不同角色会拿到同一个权限编码，
      // 加 DISTINCT 就是把重复的权限码去重，避免返回多条一样的数据。
      .select('DISTINCT p.permission_code', 'code')
      .getRawMany<{ code: string }>();

    console.log(viaRole, '//////???')
    // 合并直接赋的权限和通过角色赋的权限
    const set = new Set<string>([
      ...direct.map((r) => r.code),
      ...viaRole.map((r) => r.code),
    ]);
    // 检查用户是管理员角色
    const roleCodes = await this.userRoleRepo
      .createQueryBuilder('ur')
      .innerJoin(RoleEntity, 'r', 'r.id = ur.role_id')
      .where('ur.user_id = :userId', { userId })
      .andWhere('r.status = 1')
      .select('r.role_code', 'roleCode')
      // 检查用户是否有管理员角色
      .getRawMany<{ roleCode: string }>();
    
    // 检查用户是否有管理员角色
    const isAdmin = roleCodes.some((r) =>
      (ADMIN_ROLES as readonly string[]).includes(r.roleCode),
    );
    // 如果是管理员角色，添加管理员操作权限
    if (isAdmin) {
      for (const code of ADMIN_OPERATION_PERMISSIONS) {
        set.add(code);
      }
    }

    return [...set];
  }
}