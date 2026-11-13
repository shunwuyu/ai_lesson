import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { bigintTransformer } from '../../common/transformers/bigint.transformer';

@Entity('kh_team_member')
export class TeamMemberEntity {
  @PrimaryColumn({ type: 'bigint', transformer: bigintTransformer })
  id: string; 

  @Column({ name: 'team_id', type: 'bigint', transformer: bigintTransformer })
  teamId: string;

  @Column({ name: 'user_id', type: 'bigint', transformer: bigintTransformer })
  userId: string;

  @Column({ name: 'member_role', type: 'varchar', length: 20, default: 'member' })
  memberRole: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}