import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { AuthUser } from './auth-user.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  userInfo: AuthUser;
}
// JWT 令牌里载荷（payload）的结构、约束类型。
// Payload（就是你这个 TokenPayload 对应的内容）
interface TokenPayload {
  // 不变的唯一标识（用户 id）
  sub: string;
  username: string;
  type: 'access' | 'refresh';
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    
  }

  private accessExpires(): string {
    return this.config.get<string>('JWT_ACCESS_EXPIRES', '2h');
  }

  private refreshExpires(): string {
    return this.config.get<string>('JWT_REFRESH_EXPIRES', '7d');
  }

  private accessExpiresSeconds(): number {
    const raw = this.accessExpires();
    const match = /^(\d+)([smhd])$/.exec(raw);
    if (!match) return 7200;
    const n = Number(match[1]);
    const unit = match[2];
    if (unit === 's') return n;
    if (unit === 'm') return n * 60;
    if (unit === 'h') return n * 3600;
    return n * 86400;
  }

  async login(dto: LoginDto): Promise<LoginResult> {
    const user = await this.userService.validateCredentials(
      dto.username,
      dto.password,
    );
    console.log(user, '////////');
    await this.userService.touchLastLogin(user.userId);
    return this.buildLoginResult(user);
  }

  private buildLoginResult(user: AuthUser): LoginResult {
    return {
      accessToken: this.signAccessToken(user),
      refreshToken: this.signRefreshToken(user),
      tokenType: 'Bearer',
      expiresIn: this.accessExpiresSeconds(),
      userInfo: user,
    };
  }

  private signAccessToken(user: AuthUser): string {
    const payload: TokenPayload = {
      sub: user.userId,
      username: user.username,
      type: 'access',
    };
    return this.jwtService.sign(payload, {
      // 我保证这个字符串符合这个格式，你别报错
      expiresIn: this.accessExpires() as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });
  }

  private signRefreshToken(user: AuthUser): string {
    const payload: TokenPayload = {
      sub: user.userId,
      username: user.username,
      type: 'refresh',
    };
    return this.jwtService.sign(payload, {
      expiresIn: this.refreshExpires() as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });
  }
}
