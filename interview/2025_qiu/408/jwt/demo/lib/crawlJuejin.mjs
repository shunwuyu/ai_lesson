// index.mjs
import { createCrawl, createCrawlOpenAI } from 'x-crawl';

export const crawlJuejin = async () => {
  // 1. 实例化爬虫应用
const crawlApp = createCrawl({
  maxRetry: 3,
  intervalTime: { max: 2000, min: 1000 }
});

// 2. 实例化 OpenAI 客户端
const crawlOpenAIApp = createCrawlOpenAI({
  clientOptions: {
    apiKey: process.env.OPENAI_API_KEY,
    // 可选：使用代理地址
    baseURL: process.env.OPENAI_BASE_URL,
  },
  defaultModel: {
    chatModel: 'gpt-4-turbo-preview' // 使用强大的 GPT 模型
  }
});

// 3. 开始爬取并使用 AI 解析
crawlApp.crawlPage('https://juejin.cn/')
  .then(async (res) => {
    const { page } = res.data;
    const targetSelector = '.entry-list'; // 目标内容的选择器

    // 等待目标内容加载
    await page.waitForSelector(targetSelector);
    
    // 获取目标区域的 HTML
    const htmlContent = await page.$eval(targetSelector, el => el.innerHTML);

    // 4. 使用 AI 解析 HTML 内容
    const result = await crawlOpenAIApp.parseElements(
      htmlContent,
      `
      请从以下HTML中提取所有文章的信息。
      提取字段：文章标题 (title)、文章摘要 (content)
      请以 JSON 数组的格式返回结果。
      `
    );

    return result
  })
  .catch(console.error);
}

