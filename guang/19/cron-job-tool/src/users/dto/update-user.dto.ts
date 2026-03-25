//能基于已有的数据校验类（DTO）快速生成新的类（比如只保留部分字段、让字段可选），不用重复写相同的字段定义。
import { PartialType } from '@nestjs/mapped-types';
// 基于 CreateUserDto 生成 UpdateUserDto
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
