// posts/dto/post-query.dto.ts
// 类检测：分页查询参数
import { IsOptional, IsInt, Min } from 'class-validator';
// 类转换：将查询参数转换为数字类型
import { Type } from 'class-transformer';

export class PostQueryDto {
  @IsOptional() // 可选参数
  @Type(() => Number) // 转换为数字类型
  @IsInt() // 检测是否为整数
  @Min(1) // 最小值为 1
  page?: number = 1; // 默认第 1 页

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1) // 最小值为 1
  limit?: number = 10; // 默认每页 10 条
}