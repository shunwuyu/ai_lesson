import {
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermissionEntity } from './entities/user-permission.entity';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from './entities/permission.entity';



@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(UserPermissionEntity)
    private readonly userPermRepo: Repository<UserPermissionEntity>,
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
  }


}