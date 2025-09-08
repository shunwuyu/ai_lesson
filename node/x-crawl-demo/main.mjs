import { createCrawl, 
  createCrawlOpenAI } from 'x-crawl'
import { writeFile } from 'fs/promises';
import { join } from 'path';

//Create a crawler application
const crawlApp = createCrawl({
  maxRetry: 3,
  intervalTime: { max: 2000, min: 1000 }
})

async function writeJsonToFile(data, filename) {
  // 确定文件的路径，这里假设是在当前工作目录下
  const filePath = join(process.cwd(), filename);

  try {
    // 将数据转换为 JSON 格式并写入文件
    await writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`数据已成功写入至: ${filePath}`);
  } catch (error) {
    console.error('写入文件时发生错误:', error);
  }
}

//Create AI application
const crawlOpenAIApp = createCrawlOpenAI({
  clientOptions: { 
    apiKey: 'sk-Y9UF0cvidvCtVJtkvd5RTAhc8TkvyDrEsrlCZY5QP6JhKuyO',
    baseURL: 'https://api.302.ai/v1/' 
  
  },
  defaultModel: { chatModel: 'gpt-4o' }
})

// crawlPage is used to crawl pages
crawlApp.crawlPage('https://www.cnblogs.com/#p2').then(async (res) => {
  const { page, browser } = res.data
  // console.log(page, '////')
  // Wait for the element to appear on the page and get the HTML
  const targetSelector = '#post_list'
  await page.waitForSelector(targetSelector)
  const highlyHTML = await page.$eval(targetSelector, (el) => el.innerHTML)
  // console.log()

  // Let the AI get the image link and de-duplicate it (the more detailed the description, the better)
  const srcResult = await crawlOpenAIApp.parseElements(
    highlyHTML,
    `获取每一个.post-item元素里面的.post-item-title里的标题，
    .post-item-summary里的纯文本摘要，以JSON 格式返回。
    如：[{
      "title": "找到最适合你的 PHP 异步方案",
      "content":"ReactPHP、Swoole、Webman、FrankenPHP 深度对比 找到最适合你的 PHP 异步方案 PHP 项目做大了，
      经常会遇到这样的问题"
    }]
    `
  )

  browser.close()

  writeJsonToFile(srcResult, 'data/posts.json')

  // console.log(srcResult, '/////');
  // // crawlFile is used to crawl file resources
  // // crawlApp.crawlFile({
  // //   targets: srcResult.elements.map((item) => item.src),
  // //   storeDirs: './upload'
  // // })
  // crawlApp.crawlFile({
  //     targets: srcResult.elements[0].image_link,
  //     storeDirs: './upload'
  // })
})