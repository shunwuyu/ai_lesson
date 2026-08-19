import { IsArray, IsString } from 'class-validator';

export class CreateAiDiaryDto {
  @IsString({ message: '内容必须是字符串' })
  content: string;

  @IsString({ message: '日期必须是字符串' })
  date: string;

  @IsString({ message: '心情必须是字符串' })
  mood: string;

  @IsArray({ message: '标签必须是数组' })
  tags: string[];
}