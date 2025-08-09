// src/todos/dto/update-todo.dto.ts
// 继承所有属性 - 从现有 DTO 继承所有字段
// 设为可选 - 将所有属性变为可选（?）
import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsOptional, IsString, Length, IsBoolean } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  // PartialType 已将所有字段变为可选，但你可以额外声明/覆盖校验
  @IsOptional()
  @IsString()
  @Length(1, 200)
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
