// class-validator 是一个适用于 TypeScript 和 JavaScript 的开源验证库，它允许开发者通过装饰器
// （Decorators）或编程方式，对类实例的属性进行声明式的数据验证。
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
// DTO（Data Transfer Object，数据传输对象）
// 在运行时配合验证管道（ValidationPipe）对传入数据进行自动校验、转换和安全过滤。
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
