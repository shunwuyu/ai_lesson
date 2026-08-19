import { IsArray, IsString } from 'class-validator';

export class CreateAiDiaryDto {
  @IsString()
  content: string;

  @IsString()
  date: string;

  @IsString()
  mood: string;

  @IsArray()
  tags: string[];
}