import {
    Entity,
    Column,
    PrimaryGeneratedColumn //主键 
} from 'typeorm';

@Entity({ name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    name?: string;

    @Column()
    password?: string;
}