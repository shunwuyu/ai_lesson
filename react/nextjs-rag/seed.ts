// 使用 Puppeteer 抓取网页内容并转换为文档的工具，用于将动态网页数据接入 AI 处理流程。
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { embed } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

const scrapePage = async (url: string): Promise<string> => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });
  // 基本作用是去除 HTML 标签
  return (await loader.scrape()).replace(/<[^>]*>?/gm, "");
};
// 每个小块最多 512 个字符
// 相邻两块之间有 100 个字符的重叠<br>👉 前一块的最后 
// 100 字，和下一块的前 100 字是一样的，避免上下文断开
// 这行代码创建了一个文本分割器，作用是把大段文本切分成小块，便于 AI 处理（如向量存储、检索等）
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});


const loadData = async (webpages: string[]) => {
  for await (const url of webpages) {
    const content = await scrapePage(url);
    // console.log(content);
    const chunks = await splitter.splitText(content);
    for await (const chunk of chunks) {
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: chunk,
      });
      console.log(embedding);
      const { error } = await supabase.from("chunks").insert({
        content: chunk,
        vector: embedding,
        url: url,
      });
      if (error) {
        console.error("Error inserting chunk:", error);
      }
    }
  }
}

loadData([
  "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25",
  // "https://en.wikipedia.org/wiki/Samsung_Galaxy_S24",
  // "https://en.wikipedia.org/wiki/IPhone_16",
  // "https://en.wikipedia.org/wiki/IPhone_16_Pro",
  // "https://en.wikipedia.org/wiki/IPhone_15",
  // "https://en.wikipedia.org/wiki/IPhone_15_Pro",
]);