import { Inject, Injectable } from '@nestjs/common';
// 引入腾讯云 ASR 客户端，用于语音识别
import type * as tencentcloud from 'tencentcloud-sdk-nodejs';

type UploadedAudio = {
  buffer: Buffer; // 二进制数据
  originalname: string; // 原始文件名
  mimetype: string; // 文件类型
  size: number; // 文件大小
};
// InstanceType 从构造函数类型中提取实例类型
// 属于 **TypeScript 内置工具类型**
// Pick 挑选属性
// Omit 排除属性
type AsrClient = InstanceType<typeof tencentcloud.asr.v20190614.Client>;

@Injectable()
export class SpeechService {
  constructor(@Inject('ASR_CLIENT') private readonly asrClient: AsrClient) {}

  async recognizeBySentence(file: UploadedAudio): Promise<string> {
    const audioBase64 = file.buffer.toString('base64');

    const result = await this.asrClient.SentenceRecognition({
      EngSerViceType: '16k_zh',
      SourceType: 1,
      Data: audioBase64,
      DataLen: file.buffer.length,
      VoiceFormat: 'ogg-opus',
    });

    return result.Result ?? '';
  }
}
