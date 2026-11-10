import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { bigintTransformer } from '../../common/transformers/bigint.transformer';

@Entity('kh_permission')
export class PermissionEntity {
  @PrimaryColumn({ type: 'bigint', transformer: bigintTransformer })
  id: string;

  @Column({
    name: 'parent_id',
    type: 'bigint',
    default: '0',
    transformer: bigintTransformer,
  })
  parentId: string;

  @Column({ name: 'permission_name', type: 'varchar', length: 50 })
  permissionName: string;

  @Column({ name: 'permission_code', type: 'varchar', length: 100, unique: true })
  permissionCode: string;

  /** 1 菜单 2 按钮 3 接口 */
  @Column({ name: 'permission_type', type: 'smallint' })
  permissionType: number;

  @Column({ name: 'menu_url', type: 'varchar', length: 200, nullable: true })
  menuUrl?: string | null;

  @Column({ name: 'api_url', type: 'varchar', length: 500, nullable: true })
  apiUrl?: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  method?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon?: string | null;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
