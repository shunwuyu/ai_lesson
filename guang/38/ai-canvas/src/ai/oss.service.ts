import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';
import { extname } from 'node:path';
// Node.js 内置加密模块，提供哈希、UUID、加解密等密码学能力
// 生成一个不容易重复的 UUID 字符串。
import { randomUUID } from 'node:crypto';

// 定义 OSS 上传签名的接口
export interface OssUploadSignature {
  // OSS 主机名 例如 https://ai-canvas.oss-cn-beijing.aliyuncs.com
  host: string;
  // OSS 上传路径 例如 ai-canvas/uploads/16945024001234567890.png
  key: string;
  // OSS 上传 URL 例如 https://ai-canvas.oss-cn-beijing.aliyuncs.com/ai-canvas/uploads/16945024001234567890.png
  url: string;
  // OSS 访问密钥 ID 例如 LTAI4Gm368f9857
  OSSAccessKeyId: string;
  // OSS 上传策略 例如 {"expiration":"2023-12-31T23:59:59Z","conditions":[{"content-length-range":0,1048576000},{"eq":"$key","ai-canvas/uploads/16945024001234567890.png"}]}
  policy: string;
  // OSS 上传签名 例如 "1234567890abcdef1234567890abcdef"
  Signature: string;
  // OSS 上传签名过期时间 例如 2023-12-31T23:59:59Z
  expire: string;
}

@Injectable()
export class OssService {
  private readonly logger = new Logger(OssService.name);
  private readonly client: OSS;
  private readonly postClient: OSS;
  private readonly bucket: string;
  private readonly region: string;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.trimEnv('OSS_BUCKET');
    this.region = this.trimEnv('OSS_REGION');
    const accessKeyId = this.trimEnv('OSS_ACCESS_KEY_ID');
    const accessKeySecret = this.trimEnv('OSS_ACCESS_KEY_SECRET');

    this.client = new OSS({
      region: this.region,
      accessKeyId,
      accessKeySecret,
      authorizationV4: true,
      bucket: this.bucket,
    });
    // 上传策略客户端
    this.postClient = new OSS({
      region: this.region,
      accessKeyId,
      accessKeySecret,
      bucket: this.bucket,
    });
  }

  createUploadPolicy(ext = '.jpg'): OssUploadSignature {
    const prefix = this.config.get<string>(
      // 取这个变量
      'OSS_UPLOAD_PREFIX',
      // 未配置时使用
      'ai-canvas/uploads',
    );
  
    const normalizedExt = ext.startsWith('.') ? ext : `.${ext}`;
    // 例如 ai-canvas/uploads/16945024001234567890.png
    const key = `${prefix}/${Date.now()}-${randomUUID()}${normalizedExt}`;
    // 1 小时过期
    // 例如 2023-12-31T23:59:59Z
    const expire = new Date();
    expire.setHours(expire.getHours() + 1);
    // 上传策略
    const policy = {
      // 上传策略过期时间
      // ISO 8601 国际标准格式的时间字符串
      // 例如 2023-12-31T23:59:59Z
      expiration: expire.toISOString(),
      // 上传策略条件
      conditions: [
        // 上传文件大小范围
        // 0 到 1048576000 字节
        ['content-length-range', 0, 1048576000],
        // 上传文件路径 与 key 一致
        // 例如 ai-canvas/uploads/16945024001234567890.png
        ['eq', '$key', key],
      ],
    };

    try {
      // 上传策略签名
      const signature = this.postClient.calculatePostSignature(policy);
      const host = `https://${this.bucket}.${this.region}.aliyuncs.com`;

      return {
        host,
        key,
        url: `${host}/${key}`,
        // OSS 访问密钥 ID 例如 LTAI4Gm368f9857
        // 身份账号
        OSSAccessKeyId: signature.OSSAccessKeyId,
        policy: signature.policy,
        // OSS 上传签名 例如 "1234567890abcdef1234567890abcdef"
        // 密钥算出来的校验指纹
        // OSS 靠 ID 找到密钥，再校验签名是否一致
        Signature: signature.Signature,
        expire: expire.toISOString(),
      };
    } catch (error) {
      throw this.wrapOssError(error, 'create upload signature');
    }
  }

  resolveReadableUrl(imageUrl: string): string {
    const host = `${this.bucket}.${this.region}.aliyuncs.com`;
    if (!imageUrl.includes(host)) {
      return imageUrl;
    }

    const objectKey = decodeURIComponent(new URL(imageUrl).pathname.slice(1));
    return this.getSignedUrl(objectKey);
  }

  async uploadBuffer(
    buffer: Buffer,
    prefix: string,
    filename: string,
  ): Promise<{ url: string; objectKey: string }> {
    const ext = extname(filename) || '.png';
    const objectKey = `${prefix}/${Date.now()}-${randomUUID()}${ext}`;

    try {
      const result = await this.client.put(objectKey, buffer);
      return { url: result.url, objectKey };
    } catch (error) {
      throw this.wrapOssError(error, 'upload to OSS');
    }
  }

  getSignedUrl(objectKey: string, expires = 3600): string {
    return this.client.signatureUrl(objectKey, { expires });
  }

  async uploadFromUrl(sourceUrl: string): Promise<string> {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      throw new InternalServerErrorException(
        `Failed to fetch generated image: ${response.status}`,
      );
    }

    const prefix = this.config.get<string>('OSS_PREFIX', 'ai-canvas/edited');
    const buffer = Buffer.from(await response.arrayBuffer());
    const { url } = await this.uploadBuffer(buffer, prefix, 'result.png');

    return url;
  }

  private trimEnv(key: string): string {
    return this.config.getOrThrow<string>(key).trim();
  }

  private wrapOssError(error: unknown, action: string): Error {
    const ossError = error as {
      code?: string;
      message?: string;
      status?: number;
    };

    this.logger.error(
      `OSS ${action} failed: ${ossError.code ?? 'UnknownError'} - ${ossError.message ?? error}`,
    );

    if (ossError.code === 'InvalidAccessKeyId') {
      return new InternalServerErrorException(
        'OSS AccessKeyId 无效，请检查 .env 中的 OSS_ACCESS_KEY_ID 是否为当前阿里云账号下有效的 RAM 密钥',
      );
    }

    if (ossError.code === 'SignatureDoesNotMatch') {
      return new InternalServerErrorException(
        'OSS AccessKeySecret 不正确，请检查 .env 中的 OSS_ACCESS_KEY_SECRET',
      );
    }

    if (ossError.code === 'NoSuchBucket') {
      return new InternalServerErrorException(
        'OSS Bucket 不存在，请检查 OSS_BUCKET 和 OSS_REGION 是否匹配',
      );
    }

    return new InternalServerErrorException(
      `OSS ${action} failed: ${ossError.message ?? 'unknown error'}`,
    );
  }
}
