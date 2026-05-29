import {
    // 列
    Column,
    // 创建日期列
    CreateDateColumn,
    // 实体 表
    Entity,
    // 主键生成策略
    PrimaryGeneratedColumn,
    // 更新日期列
    UpdateDateColumn,
    // Object-Relational Mapping 对象关系映射
  } from'typeorm';
  // 定时任务类型
  export type JobType = 'cron' | 'every' | 'at';
  
  @Entity()
  export class Job {
    // uuid 唯一标识
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text' })
    instruction: string;
  
    @Column({ type: 'varchar', length: 10, default: 'cron' })
    type: JobType;
  
    // cron 类型使用（Cron 表达式）
    @Column({ type: 'varchar', length: 100, nullable: true })
    cron: string | null;
  
    // every 类型使用（间隔毫秒）
    @Column({ type: 'int', nullable: true })
    everyMs: number | null;
  
  // at 类型使用（指定触发时间点）
    @Column({ type: 'timestamp', nullable: true })
    at: Date | null;
  
    @Column({ default: true })
    isEnabled: boolean;
  
    @Column({ type: 'timestamp', nullable: true })
    lastRun: Date | null;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}