// dto/chat.dto.ts
import { IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class Message {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  // 这个属性是一个嵌套对象（或对象数组），请递归地验证它的内部字段
  @ValidateNested({ each: true })
  // 这个属性的值应该被转换成 Message 类的实例
  @Type(() => Message)
  messages: Message[];
}