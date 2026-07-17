import "dotenv/config";
// Cheerio 用于从加载的 HTML 页面中按 CSS 选择器 .main-area p            
//   提取文章正文内容。
import "cheerio";
// @langchain/community 是 LangChain 社区维护的集成包，提供了各类文档加载  
// 核心团队负责框架层，社区负责对接各种外部工具。
// 科班的 vs 票友
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
//  RecursiveCharacterTextSplitter 是 LangChain
//   中一种文本分割器，它按照自定义分隔符列表（如 ["\n\n", "\n", " ", 
//   ""]）的优先级顺序递归地尝试分割文本，直到每个片段大小不超过设定的        
//   chunk_size，从而在保持语意完整的前提下将长文本切分成适合模型处理的块。                                                                     
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "./memory-vector-store.mjs";
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';

const embeddings = new OpenAIEmbeddings({
  model: process.env.EMBEDDINGS_MODEL_NAME || "text-embedding-v3",
});
const model = new ChatOpenAI({
  model: process.env.MODEL_NAME || "qwen-plus",
});



// 发起 HTTP 请求 → 抓取目标 URL 的原始 HTML
// Cheerio 解析 → 将 HTML 字符串解析为 DOM 树
//  选择器提取 → 按配置的 selector（如 .main-area p）筛选目标元素
// 文本提取 → 从匹配元素中提取纯文本内容
// 返回 Document 对象 → 封装为 LangChain 标准的 Document 结构（包含
  // pageContent 和 metadata）
const cheerioLoader = new CheerioWebBaseLoader(
  "https://juejin.cn/post/7638806086187565082",
  {
    selector: '.main-area p'
  }
);
// 标准的Document 结构， 包含 pageContent 和 metadata
// metadata 里包含source, title
const documents = await cheerioLoader.load();
console.log(documents);

// 第一刀，按句号切。 先把整段话按 。 切成一句一句的。切完之后，检查每一段——
//   大部分应该都合格了，但可能有个别句子还是太长。

//   第二刀，按感叹号切。 刚才那些"超长句子"，再用 !
//   去切它们。切完后，可能还是有漏网之鱼。

//   第三刀，按问号切。 接着用 ? 对剩余的"顽固分子"再切一轮。

//   没招了，硬切。如果三轮下来，还有某句话怎么都切不短（比如一个超长的不带
  // 点的句子），那就只能按字符数硬生生截断了。
  // 核心目的就是尽可能保持语义完整
// 为什么不包含, 呢？ 因为逗号代表的语义边界太弱了
// "今天我出门，买了菜，还看了电影"——按逗──
  // 切成三段，每一段都不完整，单看"买了菜"完全不知道是谁、在什么场景下。

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400,
  chunkOverlap: 50,
  separators: ["。", "!", "?"]
});

const splitDocuments = await textSplitter.splitDocuments(documents);

console.log(splitDocuments);

console.log("正在创建向量存储...");
const vectorStore = await MemoryVectorStore.fromDocuments(
  splitDocuments,
  embeddings,
);
console.log("向量存储创建完成\n");

const retriever = vectorStore.asRetriever({ k: 2 });

const questions = [
"文中 Codex 完整实战流程分为哪六大步骤，每一步核心动作是什么？"
];

// RAG 流程: 对每个问题进行检索和回答
for (const question of questions) {
  console.log("=".repeat(80));
  console.log(`问题: ${question}`);
  console.log("=".repeat(80));

  // 使用 retriever 获取相关文档
  const retrievedDocs = await retriever.invoke(question);

  // 使用 similaritySearchWithScore 获取相似度评分
  const scoredResults = await vectorStore.similaritySearchWithScore(question, 2);

  // 打印检索到的文档和相似度评分
  console.log("\n【检索到的文档及相似度评分】");
  retrievedDocs.forEach((doc, i) => {
    // 找到对应的评分
    const scoredResult = scoredResults.find(([scoredDoc]) =>
      scoredDoc.pageContent === doc.pageContent
    );
    const score = scoredResult ? scoredResult[1] : null;
    const similarity = score !== null ? (1 - score).toFixed(4) : "N/A";

    console.log(`\n[文档 ${i + 1}] 相似度: ${similarity}`);
    console.log(`内容: ${doc.pageContent}`);
    if (doc.metadata && Object.keys(doc.metadata).length > 0) {
      console.log(`元数据: `, doc.metadata);
    }
  });

  // 构建 prompt
  const context = retrievedDocs
    .map((doc, i) => `[片段${i + 1}]\n${doc.pageContent}`)
    .join("\n\n——\n\n");

  const prompt = `你是一个文章辅助阅读助手，根据文章内容来解答：
  文章内容：
  ${context}

  问题：${question}

  你的回答：`;

  console.log("\n【AI 回答】");
  const response = await model.invoke(prompt);
  console.log(response.content);
}