import { Injectable } from '@nestjs/common';
import { ChatDeepSeek } from '@langchain/deepseek';
import { DallEAPIWrapper, OpenAIEmbeddings } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import { ChatDto, type Message } from './dto/chat.dto';
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { Document } from "@langchain/core/documents";


function convertToLangChainMessages(messages: Message[]): (HumanMessage | AIMessage | SystemMessage)[] {
  return messages.map(msg => {
    switch (msg.role) {
      case 'user':
        return new HumanMessage(msg.content);
      case 'assistant':
        return new AIMessage(msg.content);
      case 'system':
        return new SystemMessage(msg.content);
      default:
        throw new Error(`Unsupported role:  $ {msg.role}`);
    }
  });
}

@Injectable()
export class AIService {
  private chatModel: ChatDeepSeek;
  private imageGenerator: DallEAPIWrapper;
  private embeddings: OpenAIEmbeddings;
  constructor() {
    this.chatModel = new ChatDeepSeek({
      configuration:{
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: process.env.DEEPSEEK_BASE_URL
      },
      model: 'deepseek-chat', // 性价比高
      streaming: true,
      temperature: 0.7,
    });

    this.imageGenerator = new DallEAPIWrapper({
      openAIApiKey: process.env.OPENAI_API_KEY,
      n: 1,
      size: '1024x1024', // 支持: '1024x1024', '1792x1024', '1024x1792'
      quality: 'hd', // 可选: 'standard' 或 'hd'
    });

    this.embeddings = new OpenAIEmbeddings({
      configuration:{
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL
      },
      model: 'text-embedding-ada-002'
    });
  }
  async chat(messages: Message[], onToken: (token: string) => void) {
    const langChainMessages = convertToLangChainMessages(messages);
    console.log(langChainMessages, '/////');
    // 使用 .stream 方法获取流
    const stream = await this.chatModel.stream(langChainMessages);

    for await (const chunk of stream) {
      const content = chunk.content as string;
      if (content) {
        // 触发回调
        onToken(content);
      }
    }
  }
  async genAvatar(name: string) {
    const avatar = await this.imageGenerator.invoke(`
    你是一位头像设计师，  根据用户的姓名${name}，设计一个专业的头像。
    `)
    console.log(avatar, "/////////////");
    return avatar
  }

  async git(diff: string) {
    // 1. 定义 Prompt (提示词工程)
    // 我们可以定义 System Message (人设) 和 Human Message (用户输入)
    // Conventional Commits（约定式提交） 是一种轻量级的提交消息格式规范，
    // 旨在通过结构化的提交信息提升 Git 提交日志的可读性、自动化能力和团队协作效率。
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "你是一个资深代码审查专家。请根据用户提供的 `git diff` 内容，生成一段符合 Conventional Commits 规范的提交日志。要求：1. 格式为 <type>(<scope>): <subject>。2. 保持简洁。3. 不要输出 markdown 格式，只输出文字。"],
      ["user", "{diff_content}"],
    ]);
    // 2. 构建处理链 (Chain)
    // 数据流向：Prompt模板 -> 模型 -> 字符串解析器
    const chain = prompt.pipe(this.chatModel).pipe(new StringOutputParser());
    console.log("正在调用 Ollama...");
    // 3. 执行
    const result = await chain.invoke({
      diff_content: diff,
    });
    console.log(result, '//////');
    return {
      result
    }
  }

  async rag(question: string) {
    // 这段代码是用 LangChain 的内存向量库（MemoryVectorStore）
    // 把三段文本“喂”给 AI。它会先用嵌入模型（embeddings）
    // 把每句话转成向量，存进内存里，后续就能根据语义相似度快速检索相关内容，
    // 比如回答“什么是 RAG？”时自动找出对应句子。整个过程不依赖数据库，适合轻量级或测试场景。
    const vectorStore = await MemoryVectorStore.fromDocuments(
      [
        new Document({
          pageContent: "React 是一个用于构建用户界面的 JavaScript 库。",
        }),
        new Document({
          pageContent: "NestJS 是一个用于构建服务端应用的 Node.js 框架。",
        }),
        new Document({
          pageContent: "RAG 通过检索外部知识增强大模型的回答能力。",
        }),
      ],
      this.embeddings
    );
    // 根据用户提的问题（question），在向量库中找 1 个最相关的文档片段。
    // 它会把问题也转成向量，然后和之前存的文本向量比对，返回语义最接近的那一条
    const docs = await vectorStore.similaritySearch(question, 1);
    console.log(docs);
    const context = docs.map(d => d.pageContent).join("\n");
    // 基于资料问问题
    const prompt = `
    你是一个专业助教，请基于下面资料回答问题。

    资料：
    ${context}

    问题：
    ${question}
    `;

    const res = await this.chatModel.invoke(prompt);
    // console.log(res);
    return res.content;
  }
}

export default AIService