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
    const direct = await this.userPermRepo
      .createQueryBuilder('up')
      .innerJoin(PermissionEntity, 'p', 'p.id = up.permission_id')
      .where('up.user_id = :userId', { userId })
      .andWhere('p.status = 1')
      .andWhere('p.deleted = false')
      .select('p.permission_code', 'code')
      .getRawMany<{ code: string }>();
    console.log(direct, '//////')

    const viaRole = await this.userRoleRepo
      .createQueryBuilder('ur')
      .innerJoin(RolePermissionEntity, 'rp', 'rp.role_id = ur.role_id')
      .innerJoin(PermissionEntity, 'p', 'p.id = rp.permission_id')
      .where('ur.user_id = :userId', { userId })
      .andWhere('p.status = 1')
      .andWhere('p.deleted = false')
      .select('DISTINCT p.permission_code', 'code')
      .getRawMany<{ code: string }>();

    console.log(viaRole, '//////???')
    const set = new Set<string>([
      ...direct.map((r) => r.code),
      ...viaRole.map((r) => r.code),
    ]);

    const roleCodes = await this.userRoleRepo
      .createQueryBuilder('ur')
      .innerJoin(RoleEntity, 'r', 'r.id = ur.role_id')
      .where('ur.user_id = :userId', { userId })
      .andWhere('r.status = 1')
      .select('r.role_code', 'roleCode')
      .getRawMany<{ roleCode: string }>();

    const isAdmin = roleCodes.some((r) =>
      (ADMIN_ROLES as readonly string[]).includes(r.roleCode),
    );

    if (isAdmin) {
      for (const code of ADMIN_OPERATION_PERMISSIONS) {
        set.add(code);
      }
    }

    return [...set];
  }
}