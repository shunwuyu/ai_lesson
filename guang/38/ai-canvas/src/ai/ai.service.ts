import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Configuration,
  GenerationResult,
  MultiModalConversation,
} from 'dashscope-sdk-official';
import { ImageDto } from './dto/image.dto';
import { ImageRecord } from './image-record.interface';
import { ImageStoreService } from './image-store.service';
import { OssService } from './oss.service';

interface WanImageOptions {
  size?: string;
  promptExtend: boolean;
  watermark: boolean;
}

interface MultiModalConversationInternal {
  syncRequest(data: Record<string, unknown>): Promise<GenerationResult>;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: MultiModalConversation;

  constructor(
    private readonly config: ConfigService,
    private readonly ossService: OssService,
    private readonly imageStore: ImageStoreService,
  ) {
    this.client = new MultiModalConversation(
      new Configuration({
        apiKey: this.config.getOrThrow<string>('OPENAI_API_KEY'),
      }),
    );
  }

  async createImage(dto: ImageDto): Promise<ImageRecord> {
    const options: WanImageOptions = {
      size: dto.size,
      // 补全风格、光照、构图、材质等细节
      promptExtend: dto.promptExtend ?? true,
      watermark: dto.watermark ?? false,
    };
    const inputImageUrl = dto.imageUrl;
    const resultUrl = inputImageUrl
      ? await this.generateByEdit(
          [
            { text: dto.prompt },
            { image: this.ossService.resolveReadableUrl(inputImageUrl) },
          ],
          options,
        )
      : await this.generateByText([{ text: dto.prompt }], options);

    const url = await this.ossService.uploadFromUrl(resultUrl);

    return this.imageStore.add({
      prompt: dto.prompt,
      url,
      inputImageUrl,
      mode: inputImageUrl ? 'edit' : 'text',
      size: options.size ?? (inputImageUrl ? '1K' : '1280*1280'),
    });
  }

  listImages(): ImageRecord[] {
    return this.imageStore.list();
  }

  deleteImage(id: string): void {
    this.imageStore.remove(id);
  }

  getUploadSignature(ext?: string) {
    return this.ossService.createUploadPolicy(ext);
  }

  private async generateByEdit(
    content: Array<{ text?: string; image?: string }>,
    options: WanImageOptions,
  ): Promise<string> {
    const raw = await this.wanCall({
      // 阿里云通义万相 2.6 的图像模型
      model: 'wan2.6-image',
      messages: [{ role: 'user', content }],
      prompt_extend: options.promptExtend,
      watermark: options.watermark,
      n: 1,
      // 不开启并行生成，
      enable_interleave: false,
      // 生成图片的大小
      size: options.size ?? '1K',
    });
    // 确保返回的是 `GenerationResult` 类型
    // 因为 `wanCall` 方法返回的是 `Promise<GenerationResult>`
    const result = raw as GenerationResult;
    this.assertSuccess(result);

    const resultUrl = this.extractImageUrl(result);
    if (!resultUrl) {
      throw new BadRequestException(
        `No image URL in DashScope response: ${JSON.stringify(result)}`,
      );
    }

    return resultUrl;
  }

  private async generateByText(
    content: Array<{ text?: string; image?: string }>,
    options: WanImageOptions,
  ): Promise<string> {
    const startedAt = Date.now();
    this.logger.log('text-to-image started (wan2.6-t2i sync)');

    const raw = await this.wanCall({
      model: 'wan2.6-t2i',
      messages: [{ role: 'user', content }],
      prompt_extend: options.promptExtend,
      watermark: options.watermark,
      n: 1,
      size: options.size ?? '1280*1280',
    });

    const result = raw as GenerationResult;
    this.assertSuccess(result);

    const resultUrl = this.extractImageUrl(result);
    if (!resultUrl) {
      throw new BadRequestException(
        `No image URL in DashScope response: ${JSON.stringify(result)}`,
      );
    }

    this.logger.log(
      `text-to-image finished in ${Date.now() - startedAt}ms`,
    );

    return resultUrl;
  }

  private extractImageUrl(result: GenerationResult): string | undefined {
    const content = result.output?.choices?.[0]?.message?.content;
    if (!Array.isArray(content)) {
      return undefined;
    }

    for (const item of content) {
      if (item.image) {
        return item.image;
      }
    }

    return undefined;
  }
  // 断言成功
  private assertSuccess(result: GenerationResult): void {
    if (result.status_code !== 200 || result.code) {
      throw new BadRequestException(
        result.message ?? `DashScope request failed: ${result.status_code}`,
      );
    }
  }

  private wanCall(options: {
    model: string;
    messages: Array<{
      role: 'user' | 'assistant' | 'system';
      content: Array<{ text?: string; image?: string }>;
    }>;
    // 给这个对象类型开口子，允许出现除`model` 、
    // `messages` 之外的任意字符串键，值类型未知（`unknown` ）。
    // 我不知道它是什么类型，所以你别乱用
    [key: string]: unknown;
  }): Promise<GenerationResult> {
    const { model, messages, ...rest } = options;
    return (
      this.client as unknown as MultiModalConversationInternal
    ).syncRequest({
      model,
      input: { messages },
      parameters: { ...rest, stream: false },
    });
  }
}
