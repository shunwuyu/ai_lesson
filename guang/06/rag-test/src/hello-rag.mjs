// 1. 环境配置加载
// 读取项目根目录下的 .env 文件，加载 OPENAI_API_KEY 等环境变量到 process.env 中
import "dotenv/config";

// 2. 导入必要的 LangChain 模块
// 从 openai 包导入聊天模型和嵌入模型类
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
// 从 core/documents 导入文档类，这是 LangChain 处理文本的标准格式
import { Document } from "@langchain/core/documents";
// 从 classic/vectorstores/memory 导入内存向量数据库（适合测试和小数据量）
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";

// ==========================================
// 第一步：初始化模型 (大脑 & 翻译官)
// ==========================================

// 【大脑】ChatOpenAI：负责最终的文本生成和逻辑推理
const model = new ChatOpenAI({
  temperature: 0, // 温度设为0，让输出更确定、更严谨，减少随机性（适合问答）
  model: process.env.MODEL_NAME, // 从环境变量读取模型名称，如 "gpt-4o"
  apiKey: process.env.OPENAI_API_KEY, // 从环境变量读取 API 密钥
  configuration: {
    // 自定义基础 URL，兼容国内代理或私有化部署的 OpenAI 接口
    baseURL: process.env.OPENAI_BASE_URL, 
  },
});

// 【翻译官】OpenAIEmbeddings：负责将文本转换为向量（数字数组）
// 计算机无法直接理解文字含义，需要通过 Embedding 将语义相似的文本映射为距离相近的向量
const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.EMBEDDINGS_MODEL_NAME, // 从环境变量读取嵌入模型，如 "text-embedding-3-small"
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL
  },
});

// ==========================================
// 第二步：构建知识库数据 (原始素材)
// ==========================================

// 创建一个 Document 对象数组
// 每个 Document 包含两部分：pageContent (核心文本) 和 metadata (辅助标签)
const documents = [
  new Document({
    pageContent: `光光是一个活泼开朗的小男孩，他有一双明亮的大眼睛，总是带着灿烂的笑容。光光最喜欢的事情就是和朋友们一起玩耍，他特别擅长踢足球，每次在球场上奔跑时，就像一道阳光一样充满活力。`,
    // metadata 用于后续过滤或溯源，不参与向量化计算，但非常有用
    metadata: { 
      chapter: 1, 
      character: "光光", 
      type: "角色介绍", 
      mood: "活泼"
    },
  }),
  new Document({
    pageContent: `东东是光光最好的朋友，他是一个安静而聪明的男孩。东东喜欢读书和画画，他的画总是充满了想象力。虽然性格不同，但东东和光光从幼儿园就认识了，他们一起度过了无数个快乐的时光。`,
    metadata: { 
      chapter: 2, 
      character: "东东", 
      type: "角色介绍", 
      mood: "温馨"
    },
  }),
  new Document({
    pageContent: `有一天，学校要举办一场足球比赛，光光非常兴奋，他邀请东东一起参加。但是东东从来没有踢过足球，他担心自己会拖累光光。光光看出了东东的担忧，他拍着东东的肩膀说："没关系，我们一起练习，我相信你一定能行的！"`,
    metadata: {
      chapter: 3,
      character: "光光和东东",
      type: "友情情节",
      mood: "鼓励",
    },
  }),
  new Document({
    pageContent: `接下来的日子里，光光每天放学后都会教东东踢足球。光光耐心地教东东如何控球、传球和射门，而东东虽然一开始总是踢不好，但他从不放弃。东东也用自己的方式回报光光，他画了一幅画送给光光，画上是两个小男孩在球场上一起踢球的场景。`,
    metadata: {
      chapter: 4,
      character: "光光和东东",
      type: "友情情节",
      mood: "互助",
    },
  }),
  new Document({
    pageContent: `比赛那天终于到了，光光和东东一起站在球场上。虽然东东的技术还不够熟练，但他非常努力，而且他用自己的观察力帮助光光找到了对手的弱点。在关键时刻，东东传出了一个漂亮的球，光光接球后射门得分！他们赢得了比赛，更重要的是，他们的友谊变得更加深厚了。`,
    metadata: {
      chapter: 5,
      character: "光光和东东",
      type: "高潮转折",
      mood: "激动",
    },
  }),
  new Document({
    pageContent: `从那以后，光光和东东成为了学校里最要好的朋友。光光教东东运动，东东教光光画画，他们互相学习，共同成长。每当有人问起他们的友谊，他们总是笑着说："真正的朋友就是互相帮助，一起变得更好的人！"`,
    metadata: {
      chapter: 6,
      character: "光光和东东",
      type: "结局",
      mood: "欢乐",
    },
  }),
  new Document({
    pageContent: `多年后，光光成为了一名职业足球运动员，而东东成为了一名优秀的插画师。虽然他们走上了不同的道路，但他们的友谊从未改变。东东为光光设计了球衣上的图案，光光在每场比赛后都会给东东打电话分享喜悦。他们证明了，真正的友情可以跨越时间和距离，永远闪闪发光。`,
    metadata: {
      chapter: 7,
      character: "光光和东东",
      type: "尾声",
      mood: "温馨",
    },
  }),
];

// ==========================================
// 第三步：向量化与存储 (建立索引)
// ==========================================

// 核心步骤：将上述 documents 数组中的所有文本通过 embeddings 转换成向量，并存入内存数据库
// 这一步完成后，我们就拥有了一个可以通过“语义”搜索的知识库
const vectorStore = await MemoryVectorStore.fromDocuments(
  documents,
  embeddings,
);

// 将向量数据库转换为“检索器 (Retriever)”
// retriever 是一个标准接口，输入问题，输出最相关的文档列表
// { k: 3 } 表示每次检索只返回相似度最高的 3 个文档片段
const retriever = vectorStore.asRetriever({ k: 3 });

// 定义要测试的问题列表
const questions = [
  "东东和光光是怎么成为朋友的？"
];

// ==========================================
// 第四步：检索与生成循环 (RAG 核心流程)
// ==========================================

for (const question of questions) {
  console.log("=".repeat(80));
  console.log(`问题：${question}`);
  console.log("=".repeat(80));

  // --- 阶段 A: 检索 (Retrieval) ---
  
  // 1. 使用 retriever 获取最相关的文档
  // 内部逻辑：将 question 转为向量 -> 在向量库中计算距离 -> 返回前 k 个 Document 对象
  const retrievedDocs = await retriever.invoke(question);

  // 2. 额外获取带相似度分数的结果（用于调试和展示）
  // similaritySearchWithScore 返回的是 [Document, score] 的元组
  // 注意：OpenAI 的 distance 通常是欧氏距离或余弦距离，数值越小越相似
  const scoredResults = await vectorStore.similaritySearchWithScore(question, 3);

  // --- 阶段 B: 日志输出 (调试用) ---
  console.log("\n【检索到的文档及相似度评分】");
  retrievedDocs.forEach((doc, i) => {
    // 在 scoredResults 中找到当前文档对应的分数
    const scoredResult = scoredResults.find(([scoredDoc]) =>
      scoredDoc.pageContent === doc.pageContent
    );
    
    // 提取原始分数
    const score = scoredResult ? scoredResult[1] : null;
    
    // 简单的分数转换逻辑：假设 score 是距离 (0 最相似)，这里尝试将其转换为类似相似度的概念 (1 - distance)
    // 注意：不同向量库的 score 含义不同，有的直接是相似度 (0-1)，有的是距离。
    const similarity = score !== null ? (1 - score).toFixed(4) : "N/A";
    
    console.log(`\n[文档 ${i + 1}] 相似度指标: ${similarity} (原始分: ${score})`);
    console.log(`内容: ${doc.pageContent.substring(0, 50)}...`); // 只打印前50字避免刷屏
    console.log(`元数据：章节=${doc.metadata.chapter}, 角色=${doc.metadata.character}, 类型=${doc.metadata.type}`);
  });

  // --- 阶段 C: 构建 Prompt (上下文组装) ---
  
  // 将检索到的文档内容拼接成一个长字符串，作为“背景知识”注入给 AI
  const context = retrievedDocs
    .map((doc, i) => `[片段${i + 1}]\n${doc.pageContent}`)
    .join("\n\n━━━━━\n\n");

  // 构造最终的提示词 (Prompt Engineering)
  // 结构：角色设定 + 约束条件 + 背景知识 (Context) + 用户问题
  const prompt = `你是一个讲友情故事的老师。基于以下故事片段回答问题，用温暖生动的语言。如果故事中没有提到，就说"这个故事里还没有提到这个细节"。

故事片段:
${context}

问题：${question}

老师的回答:`;

  // --- 阶段 D: 生成 (Generation) ---
  
  console.log("\n【AI 回答】");
  
  // 调用大模型，传入构造好的 prompt
  // 模型只会根据 prompt 中的 ${context} 来回答，不会胡乱编造库里没有的内容
  const response = await model.invoke(prompt);
  
  // 打印最终结果
  console.log(response.content);
  console.log("\n");
}