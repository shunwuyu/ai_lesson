import { Injectable } from '@nestjs/common';
import { ChatDeepSeek } from '@langchain/deepseek';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import { ChatDto, type Message } from './dto/chat.dto';


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
  }
  async chat(messages: Message[], onToken: (token: string) => void) {
    const langChainMessages = convertToLangChainMessages(messages);
    
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
}

export default AIService