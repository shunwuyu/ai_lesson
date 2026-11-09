import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { AuthUser } from './auth-user.interface';
import { UserService } from '../user/user.service';

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  userInfo: AuthUser;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {
    
  }
  async login(dto: LoginDto): Promise<LoginResult> {
    const user = await this.userService.validateCredentials(
      dto.username,
      dto.password,
    );
    console.log(user, '////////');
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
    
    // await this.userService.touchLastLogin(user.userId);
    // return this.buildLoginResult(user);
  }
}
