import { ChatOpenAI } from "@langchain/openai";  // 修改这里
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"; 
import { DynamicTool } from "langchain/tools";
import { config } from "dotenv";
config();

// // 创建一个爬取豆瓣的工具
const scrapingTool = new DynamicTool({
  name: "WebScraper",
  description: "Scrapes movie information from a given URL. ",
  func: async (url) => {
    try {
      const loader = new CheerioWebBaseLoader(url, {
        selector: "tr.item",
      });
      const docs = await loader.load();
      return docs[0].pageContent;
    } catch (error) {
      return `Error scraping the website: ${error.message}`;
    }
  },
});

async function main() {
    const model = new ChatOpenAI({  // 修改这里
        temperature: 0,
        modelName: "gpt-4o",
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL,
    });

  const executor = await initializeAgentExecutorWithOptions(
    [scrapingTool],
    model,
    {
      agentType: "zero-shot-react-description",
      verbose: true,
    }
  );

  const result = await executor.call({
    input: "请访问 https://movie.douban.com/chart 并找出中国电影",
  });

  console.log(result.output, '//////');
}

main().catch(console.error);