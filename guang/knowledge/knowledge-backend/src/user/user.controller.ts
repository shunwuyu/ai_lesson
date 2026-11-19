import { 
  Controller,
  Delete,
  Param
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleCode } from '../common/constants/roles';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Delete(':id')
  @RequirePermission('system:user')
  @Roles(RoleCode.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: '删除成功' };
  }
}
