import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @Length(1, 200)
    title: string;
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
  }