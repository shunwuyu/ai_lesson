import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { RedisService } from '../redis/redis.service';

const TOKEN_PREFIX = 'email:activation:token:';
const USER_PREFIX = 'email:activation:user:';
export const ACTIVATION_TOKEN_TTL_SECONDS = 24 * 3600;

/** 邮箱激活令牌（Redis 存储，24 小时有效） */
@Injectable()
export class EmailActivationService {
  constructor(private readonly redis: RedisService) {}

  private tokenKey(token: string): string {
    return `${TOKEN_PREFIX}${token}`;
  }

  private userKey(userId: string): string {
    return `${USER_PREFIX}${userId}`;
  }

  async createToken(userId: string): Promise<string> {
    const existing = await this.redis.get(this.userKey(userId));
    if (existing) {
      await this.redis.del(this.tokenKey(existing));
    }

    const token = randomBytes(32).toString('hex');
    // token → userId：用户点激活链接时，用 token 查出要激活的账号
    await this.redis.set(
      this.tokenKey(token),
      userId,
      ACTIVATION_TOKEN_TTL_SECONDS,
    );
    // userId → token：同一用户只保留一个有效 token，重发时先按 userId 找到并作废旧的
    await this.redis.set(
      this.userKey(userId),
      token,
      ACTIVATION_TOKEN_TTL_SECONDS,
    );
    return token;
  }

  /** 校验并消费 token，返回 userId */
  async consumeToken(token: string): Promise<string | null> {
    const userId = await this.redis.get(this.tokenKey(token));
    if (!userId) return null;

    await this.redis.del(this.tokenKey(token));
    await this.redis.del(this.userKey(userId));
    return userId;
  }

  async deleteByToken(token: string): Promise<void> {
    const userId = await this.redis.get(this.tokenKey(token));
    await this.redis.del(this.tokenKey(token));
    if (userId) {
      await this.redis.del(this.userKey(userId));
    }
  }
}
