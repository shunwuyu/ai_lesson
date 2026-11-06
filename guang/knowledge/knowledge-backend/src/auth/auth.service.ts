import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { AuthUser } from './auth-user.interface';

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  userInfo: AuthUser;
}

@Injectable()
export class AuthService {
  async login(dto: LoginDto): Promise<LoginResult> {
    return {
      accessToken: '123456',
      refreshToken: '123456',
      tokenType: 'Bearer',
      expiresIn: 3600,
      userInfo: {
        userId: '123456',
        username: 'guang',
        realName: '王光',
        email: 'guang@example.com',
        avatar: 'https://example.com/avatar.jpg',
        roles: ['admin'],
        permissions: ['admin'],
        teamIds: ['123456'],
      },
    }
    // const user = await this.userService.validateCredentials(
    //   dto.username,
    //   dto.password,
    // );
    // await this.userService.touchLastLogin(user.userId);
    // return this.buildLoginResult(user);
  }
}
