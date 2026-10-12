import { Inject, Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import {  
  AIMessageChunk, 
  createAgent
} from 'langchain';
// 标准聊天消息格式
import { UIMessage } from 'ai'; // vercel ai sdk 
// AI SDK 的后端适配器，将 LangChain Agent 的原生事件流转换成 AI SDK 
// 标准流式输出，可直接通过 SSE 给到前端`useChat`消费。
import { 
  // 把前端`useChat`传过来的 AI SDK 消息（UIMessage），转换成 LangChain 能识别的 BaseMessage 消息对象，喂给 Agent 做输入。
  toBaseMessages, 
  // 接收 LangChain Agent 产生的事件流，转成 AI SDK 标准的消息流，直接通过 SSE 输出，供前端`useChat`解析渲染。
  toUIMessageStream 
} from '@ai-sdk/langchain';

@Injectable()
export class AiService {
  // AI 助手的 Agent 实例
  // ReturnType 工具类，用于获取函数返回值的类型 
  // 自动提取`createAgent`返回的**带工具 / 状态泛型的 Agent 类型**
  // 用 ReturnType 省事、类型不会写错
  private readonly agent: ReturnType<typeof createAgent>;

  constructor(
    @Inject('WEB_SEARCH_TOOL') private readonly webSearchTool: any,
    @Inject('SEND_MAIL_TOOL') private readonly sendMailTool: any,
    @Inject('CHAT_MODEL') model: ChatOpenAI
  ) {
    this.agent = createAgent({
        model,
        tools: [this.webSearchTool, this.sendMailTool],
        systemPrompt:
          '你是 AI 助手，需要最新信息、事实核查或联网信息时，请使用 web_search 工具搜索后再作答。发送邮件用 send_mail 工具',
      });
  }
  // LangGraph 自带 stream 返回异步迭代器， 不用手写 生成器函数
  // 处理前端传过来的 UIMessage
  async stream(messages: UIMessage[]) {
    // 把前端传过来的 UIMessage 转换成 LangChain 能识别的 BaseMessage 消息对象，喂给 Agent 做输入。
    // lc lanchain的简写
    const lcMessages = await toBaseMessages(messages);
    // lg 是 langgraph 缩写 
    const lgStream = await this.agent.stream(
      { messages: lcMessages },
      {
        // 流式输出模式，支持 messages 和 values 两种模式
        streamMode: ['messages', 'values'],
        // 递归调用次数限制，防止无限递归
        recursionLimit: 30,
      },
    );
    // 把 LangChain Agent 产生的事件流，转成 AI SDK 标准的消息流，直接通过 SSE 输出，供前端`useChat`解析渲染。
    return toUIMessageStream(lgStream as AsyncIterable<AIMessageChunk>);
  }
}
