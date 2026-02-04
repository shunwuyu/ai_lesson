import { Controller, Get, Query, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

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
  // 如果不符合CreateUserDto 的验证约束 NestJS 的 ValidationPipe 会自动拦截请求，
  // 抛出 400 Bad Request 错误
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get('/avatar')
  @UseGuards(JwtAuthGuard)
  async genAvatar(@Req() req) {
    console.log(req.user);
    const { name } = req.user;
    return this.userService.genAvatar(name);
  }
}
