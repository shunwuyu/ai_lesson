import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}

  async sendActivationEmail(
    email: string,
    username: string,
    token: string,
  ): Promise<void> {
    const baseUrl = this.config.get<string>(
      'APP_PUBLIC_URL',
      'http://localhost:3000',
    );
    const link = `${baseUrl}/auth/verify-email?token=${token}`;

    await this.mailer.sendMail({
      to: email,
      subject: '激活您的知识库账户',
      text: `您好 ${username}，请点击以下链接激活账户（24 小时内有效）：\n${link}`,
      html: `
        <p>您好 <strong>${username}</strong>，</p>
        <p>欢迎注册知识库，请点击下方链接激活账户（24 小时内有效）：</p>
        <p><a href="${link}">${link}</a></p>
        <p>如非本人操作，请忽略此邮件。</p>
      `,
    });
  }

  async sendResetCodeEmail(
    email: string,
    username: string,
    code: string,
  ): Promise<void> {
    await this.mailer.sendMail({
      to: email,
      subject: '密码重置验证码',
      text: `您好 ${username}，您的密码重置验证码是：${code}，10 分钟内有效，请勿泄露。`,
      html: `
        <p>您好 <strong>${username}</strong>，</p>
        <p>您正在重置密码，验证码为：</p>
        <p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${code}</p>
        <p>验证码 10 分钟内有效，请勿泄露给他人。</p>
        <p>如非本人操作，请忽略此邮件。</p>
      `,
    });
  }
}
