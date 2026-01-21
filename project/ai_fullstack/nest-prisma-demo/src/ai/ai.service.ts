import { Injectable } from '@nestjs/common';
import { ChatOpenAI, OpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class AIService {
  private chatModel: ChatOpenAI;
  constructor() {
    this.chatModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      configuration:{
        baseURL: ''
      },
      model: 'gpt-4o-mini', // 性价比高
      temperature: 0.7,
    });
  }
  async chat(prompt: string) {
    const messages = [
      new SystemMessage('你是一个有帮助的 AI 助手'),
      new HumanMessage(prompt),
    ];

    const res = await this.chatModel.invoke(messages);

    return res.content;
  }
}

export default AIService