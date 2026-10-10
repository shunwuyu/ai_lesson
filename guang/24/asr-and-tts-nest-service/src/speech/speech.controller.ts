import {
  BadRequestException, // 400 错误，请求参数错误
  Controller, // 控制器，用于处理 HTTP 请求
   Post, // POST 请求装饰器
  // 用于处理文件上传的装饰器
  UploadedFile, // 上传文件装饰器，用于获取上传的文件信息
  UseInterceptors, // 用于使用拦截器的装饰器
} from '@nestjs/common';
// 引入文件上传拦截器，用于处理文件上传
import { FileInterceptor } from '@nestjs/platform-express';
import { SpeechService } from './speech.service';

@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}
  // 处理语音识别请求
  @Post('asr') // 接口路由，这是 POST 请求，访问地址 `/speech/asr`
  // 上传音频文件
  // Nest 拦截器是 AOP 思想，在请求到达方法前预处理，专门解析提取上传文件。
  // Aspect Oriented Programming，面向切面编程
  // 把通用逻辑抽成切面，和业务代码分离。
  @UseInterceptors(FileInterceptor('audio')) // 文件拦截器，接收表单里名字叫`audio`的音频文件
  async recognize(
    @UploadedFile()
    file?: {
      buffer: Buffer;
      originalname: string;
      mimetype: string;
      size: number;
    },
  ) {
    if (!file?.buffer?.length) {
      throw new BadRequestException(
        '请通过 FormData 的 audio 字段上传音频文件',
      );
    }

    const text = await this.speechService.recognizeBySentence(file);
    return { text };
  }
}
