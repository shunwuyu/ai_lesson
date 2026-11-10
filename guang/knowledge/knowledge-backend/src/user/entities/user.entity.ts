import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { bigintTransformer } from '../../common/transformers/bigint.transformer';

/** 用户（PostgreSQL kh_user） */
@Entity('kh_user')
export class UserEntity {
  @PrimaryColumn({ type: 'bigint', transformer: bigintTransformer })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string | null;

  @Column({ name: 'real_name', type: 'varchar', length: 50, nullable: true })
  realName?: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar?: string | null;

  /** 0 未验证 1 已验证 */
  @Column({ name: 'email_verified', type: 'smallint', default: 1 })
  emailVerified: number;

  /** 0 禁用 1 启用 */
  @Column({ type: 'smallint', default: 1 })
  status: number;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
