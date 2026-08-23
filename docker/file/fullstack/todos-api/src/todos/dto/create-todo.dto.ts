// src/todos/dto/create-todo.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Todo title cannot be empty' })
  title: string;
}