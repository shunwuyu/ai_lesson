import { config } from 'dotenv';
import { createCrawl, createCrawlOpenAI } from 'x-crawl';

config(); // 加载 .env 文件中的环境变量

const crawlApp = createCrawl({
  maxRetry: 3,
  intervalTime: {
    max: 2000,
    min: 1000
  },
});

// AI 辅助
const crawlOpenAIApp = createCrawlOpenAI({
  clientOptions: {
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
  },
  defaultModel: {
    chatModel: "gpt-4o"
  }
});

crawlApp
  .crawlPage('https://www.cnblogs.com/')
  .then(async (res) => {
    const { page, browser } = res.data;

    const targetSelector = '#post_list';
    await page.waitForSelector(targetSelector);

    const highlyHTML = await page.$eval(targetSelector, (el) => el.innerHTML);
    console.log(highlyHTML);

    await browser.close();
  });
