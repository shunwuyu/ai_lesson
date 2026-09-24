import {
  Column, //  字段映射
  CreateDateColumn, //  创建时间字段映射
  Entity, //  实体映射
  JoinColumn, //  关联字段映射
  ManyToOne,//  多对一关联映射
  OneToMany, //  一对多关联映射
  PrimaryGeneratedColumn,//  主键自增映射
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'text', nullable: true })
  title: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  // 多对一关联，多条会话归属一个用户，用户删除时级联删除全部会话。
  // 返回目标实体
  // 告诉 TypeORM，反向关联对应 User 实体里的`conversations`属性。
  // 删除 User 用户时，数据库级联把它所有关联的 conversations 会话一并删掉。
  @ManyToOne(() => User, (user) => user.conversations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}