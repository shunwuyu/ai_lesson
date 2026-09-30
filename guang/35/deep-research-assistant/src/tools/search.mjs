import { tool } from "langchain";
import { z } from "zod";

const BOCHA_API_URL = "https://api.bochaai.com/v1/web-search";

function formatWebPages(webpages) {
  return webpages
    .map(
      (page, idx) =>
        `引用: ${idx + 1}
标题: ${page.name ?? ""}
URL: ${page.url ?? ""}
摘要: ${page.summary ?? ""}
网站名称: ${page.siteName ?? ""}
网站图标: ${page.siteIcon ?? ""}
发布时间: ${page.dateLastCrawled ?? ""}`,
    )
    .join("\n\n");
}

async function bochaWebSearch(query, count) {
  const apiKey = process.env.BOCHA_API_KEY?.trim();
  if (!apiKey) {
    return "Bocha 联网搜索的 API Key 未配置（环境变量 BOCHA_API_KEY），请先在 .env 中配置后再重试。";
  }

  const response = await fetch(BOCHA_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      freshness: "noLimit",
      summary: true,
      count,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return `搜索 API 请求失败，状态码: ${response.status}，错误信息: ${errorText}`;
  }

  let json;
  try {
    json = await response.json();
  } catch (e) {
    return `搜索 API 请求失败，原因是：搜索结果解析失败 ${e.message}`;
  }

  try {
    if (json.code !== 200 || !json.data) {
      return `搜索 API 请求失败，原因是: ${json.msg ?? "未知错误"}`;
    }

    const webpages = json.data.webPages?.value ?? [];
    if (!webpages.length) {
      return `未找到与「${query}」相关的结果。`;
    }

    return formatWebPages(webpages);
  } catch (e) {
    return `搜索 API 请求失败，原因是：搜索结果解析失败 ${e.message}`;
  }
}

export const webSearch = tool(
  async (input) => {
    const count = input.count ?? 10;
    console.log(`  🔎 搜索: ${input.query}（${count} 条）`);
    return bochaWebSearch(input.query, count);
  },
  {
    name: "web_search",
    description:
      "使用 Bocha 联网搜索 API 检索互联网网页。输入中文或中英结合的搜索关键词，可选 count 指定结果数量。返回标题、URL、摘要、网站名称、图标和发布时间。",
    schema: z.object({
      query: z
        .string()
        .min(1)
        .describe("搜索关键词，优先使用中文，例如：2026年 AI Agent 框架对比、LangGraph 最新动态"),
      count: z
        .number()
        .int()
        .min(1)
        .max(20)
        .optional()
        .describe("返回的搜索结果数量，默认 10 条"),
    }),
  },
);
