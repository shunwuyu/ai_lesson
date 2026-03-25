// class-validator 来做参数校验
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email: string;
}