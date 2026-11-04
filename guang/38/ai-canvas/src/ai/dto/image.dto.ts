// DTO 即数据传输对象，用来在接口收发时规范、校验传输的数据结构。
// `class-transformer` 的 `Transform` 装饰器，用来在 DTO 序列化 / 反序列化时自定义字段值转换逻辑。
import { Transform } from 'class-transformer';
// 用于给 DTO 字段添加校验规则，控制字段是否必填、类型为布尔 / 字符串。
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  @IsNotEmpty()
  // 这个装饰器作用：DTO 转数据的时候，自动把字符串前后的空格给去掉。
  // 统一在 DTO 层做清洗，集中规范，不用每个接口手写 JS 去空格，减少重复代码，逻辑收敛好维护。
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  prompt: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' && value.trim() ? value.trim() : undefined,
  )
  imageUrl?: string;

  @IsOptional()
  @IsString()
  size?: string;
  
  // 是否开启提示词扩展
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? true)
  promptExtend?: boolean;
  
  // 是否添加水印
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  watermark?: boolean;
}
