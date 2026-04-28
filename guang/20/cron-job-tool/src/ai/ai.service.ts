import { Injectable, Inject } from '@nestjs/common';
import { Runnable } from'@langchain/core/runnables';

import {
    type AIMessageChunk,
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from'@langchain/core/messages';
import { ChatOpenAI } from'@langchain/openai';

@Injectable()
export class AiService {
    private readonly modelWithTools: Runnable<BaseMessage[], AIMessage>;

    constructor(
        @Inject('CHAT_MODEL') model: ChatOpenAI,
        @Inject('DB_USERS_CRUD_TOOL') private readonly dbUsersCrudTool: any 
    ) {
        this.modelWithTools = model.bindTools([
            this.dbUsersCrudTool
        ])
    }
    async *runChainStream(query: string): AsyncIterable<string> {
        const messages: BaseMessage[] = [
            new SystemMessage(
              '你是一个智能助手，可以在需要时调用工具（如 query_user）来查询用户信息，再用结果回答用户的问题。',
            ),
            new HumanMessage(query),
          ];
       
        while (true) {
          // 一轮对话：先让模型思考并（可能）提出工具调用
          // 一轮对话：先让模型思考并（可能）提出工具调用
            const stream = await this.modelWithTools.stream(messages);
            let fullAIMessage: AIMessageChunk | null = null;

            for await (const chunk of stream as AsyncIterable<AIMessageChunk>) {
                // 使用 concat 持续拼接，得到本轮完整的 AIMessageChunk
                // 本轮完整才能判断是否需要调用工具
                fullAIMessage = fullAIMessage ? fullAIMessage.concat(chunk) : chunk;
                // 判断是否需要调用工具
                // !! 一定转为boolean类型 
                const hasToolCallChunk =
                  !!fullAIMessage.tool_call_chunks &&
                  fullAIMessage.tool_call_chunks.length > 0;
         
                // 只要当前轮次还没出现 tool 调用的 chunk，就可以把文本内容流式往外推
                if (!hasToolCallChunk && chunk.content) {
                    yield chunk.content as string
                }
              }
              // 如果本轮没有完整的消息，则直接结束
              if (!fullAIMessage) {
                return;
              }
              // 把本轮完整的消息推入 messages 数组
              messages.push(fullAIMessage);
              // 获取工具调用
              const toolCalls = fullAIMessage.tool_calls ?? [];
         
              // 没有工具调用：说明这一轮就是最终回答，已经在上面的 for-await 中流完了，可以结束
              if (!toolCalls.length) {
                return;
              }
         
              // 有工具调用：本轮我们不再额外输出内容，而是执行工具，生成 ToolMessage，进入下一轮
              for (const toolCall of toolCalls) {
                const toolCallId = toolCall.id || '';
                const toolName = toolCall.name;
                if (toolName === 'db_users_crud') {
                    const result = await this.dbUsersCrudTool.invoke(toolCall.args);
                    messages.push(
                        new ToolMessage({
                            tool_call_id: toolCallId,
                            name: toolName,
                            content: result,
                        })
                    )
                }
              }

        }
    }
}
