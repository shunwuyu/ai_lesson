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
    UpdateDateColumn 
} from"typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @Column({
        length: 50
    })
    email: string;
    // 自动创建
    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt: Date;
}