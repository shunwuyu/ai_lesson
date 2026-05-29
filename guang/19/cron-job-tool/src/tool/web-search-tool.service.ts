import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

@Injectable()
export class WebSearchToolService {
  readonly tool;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  constructor() {
    const webSearchArgsSchema = z.object({
      query: z
        .string()
        .min(1)
        .describe('搜索关键词，例如：公司年报、某个事件等'),
      count: z
        .number()
        .int()
        .min(1)
        .max(20)
        .optional()
        .describe('返回的搜索结果数量，默认 10 条'),
    });

    this.tool = tool(
      async ({ query, count }: { query: string; count?: number }) => {
        const apiKey = this.configService.get<string>('BOCHA_API_KEY');
        if (!apiKey) {
          return 'Bocha Web Search 的 API Key 未配置（环境变量 BOCHA_API_KEY），请先在服务端配置后再重试。';
        }

        const url = 'https://api.bochaai.com/v1/web-search';
        const body = {
          query,
          freshness: 'noLimit',
          summary: true,
          count: count ?? 10,
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          return `搜索 API 请求失败，状态码: ${response.status}, 错误信息: ${errorText}`;
        }

        let json: any;
        try {
          json = await response.json();
        } catch (e) {
          return `搜索 API 请求失败，原因是：搜索结果解析失败 ${(e as Error).message}`;
        }

        try {
          if (json.code !== 200 || !json.data) {
            return `搜索 API 请求失败，原因是: ${json.msg ?? '未知错误'}`;
          }

          const webpages = json.data.webPages?.value ?? [];
          if (!webpages.length) {
            return '未找到相关结果。';
          }

          const formatted = webpages
            .map(
              (page: any, idx: number) =>
                `引用: ${idx + 1}
标题: ${page.name}
URL: ${page.url}
摘要: ${page.summary}
网站名称: ${page.siteName}
网站图标: ${page.siteIcon}
发布时间: ${page.dateLastCrawled}`,
            )
            .join('\n\n');

          return formatted;
        } catch (e) {
          return `搜索 API 请求失败，原因是：搜索结果解析失败 ${(e as Error).message}`;
        }
      },
      {
        name: 'web_search',
        description:
          '使用 Bocha Web Search API 搜索互联网网页。输入为搜索关键词（可选 count 指定结果数量），返回包含标题、URL、摘要、网站名称、图标和时间等信息的结果列表。',
        schema: webSearchArgsSchema,
      },
    );
  }
}