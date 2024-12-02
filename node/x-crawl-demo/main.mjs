import { createCrawl, createCrawlOpenAI } from 'x-crawl'

//Create a crawler application
const crawlApp = createCrawl({
  maxRetry: 3,
  intervalTime: { max: 2000, min: 1000 }
})

//Create AI application
const crawlOpenAIApp = createCrawlOpenAI({
  clientOptions: { 
    apiKey: 'sk-rFBoE5GHTLgyCfOqOxkS1VItX3yu1a1D2oN8RwrlHIhqmGdo',
    baseURL: 'https://api.302.ai/v1/' 
  
  },
  defaultModel: { chatModel: 'gpt-4-turbo-preview' }
})

// crawlPage is used to crawl pages
crawlApp.crawlPage('https://movie.douban.com/chart').then(async (res) => {
  const { page, browser } = res.data
  // console.log(page, '////')
  // Wait for the element to appear on the page and get the HTML
  const targetSelector = '.indent'
  await page.waitForSelector(targetSelector)
  const highlyHTML = await page.$eval(targetSelector, (el) => el.innerHTML)

  // Let the AI get the image link and de-duplicate it (the more detailed the description, the better)
  const srcResult = await crawlOpenAIApp.parseElements(
    highlyHTML,
    `Get the image link, don't source it inside, and de-duplicate it`
  )

  browser.close()
  console.log(srcResult, '/////');
  // crawlFile is used to crawl file resources
  // crawlApp.crawlFile({
  //   targets: srcResult.elements.map((item) => item.src),
  //   storeDirs: './upload'
  // })
  crawlApp.crawlFile({
      targets: srcResult.elements[0].image_link,
      storeDirs: './upload'
  })
})