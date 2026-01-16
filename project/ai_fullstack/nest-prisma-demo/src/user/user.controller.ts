import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
  ) {
    return this.userService.findUsers(
      Number(page),
      Number(pageSize),
    );
  }
}
