import { IsString } from 'class-validator';

export class SearchAiDiaryDto {
  @IsString()
  content: string;
}