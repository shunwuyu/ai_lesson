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
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages: Message[];
}