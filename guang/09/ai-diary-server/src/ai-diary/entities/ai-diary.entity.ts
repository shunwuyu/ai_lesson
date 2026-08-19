import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AiDiary {
  @PrimaryColumn()
  id: string;

  @Column('text')
  content: string;

  @Column()
  date: string;

  @Column()
  mood: string;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}