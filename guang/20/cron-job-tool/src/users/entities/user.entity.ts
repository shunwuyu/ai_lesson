import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from"typeorm";
// @Entity() 装饰器用来将类映射为数据库表，
// @PrimaryGeneratedColumn() 装饰器用来将类映射为数据库表的主键。
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

    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt: Date;
}