import { IsString } from 'class-validator';

export class SearchAiDiaryDto {
  @IsString({ message: '请输入搜索关键字' })
  content: string;
}