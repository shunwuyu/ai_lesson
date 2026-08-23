// src/todos/dto/update-todo.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

/**
 * 更新待办事项 DTO
 * 继承自 CreateTodoDto，但所有字段均变为可选（Partial）
 */
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}