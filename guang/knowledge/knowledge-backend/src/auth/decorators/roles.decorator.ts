import { SetMetadata } from '@nestjs/common';
import { RoleCodeValue } from '../../common/constants/roles';

export const ROLES_KEY = 'roles';

/** 要求用户拥有指定角色之一（需配合 RolesGuard） */
export const Roles = (...roles: RoleCodeValue[]) =>
  SetMetadata(ROLES_KEY, roles);