import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
