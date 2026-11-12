import { Body, Controller, Post } from '@nestjs/common';
import { PermissionCode } from '../common/constants/permissions';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';

@Controller('search')
export class SearchController {
  @Post()
  @RequirePermission(PermissionCode.search)
  search() {
    return {
      message: '搜索文档',
      data: {},
    };
  }
}