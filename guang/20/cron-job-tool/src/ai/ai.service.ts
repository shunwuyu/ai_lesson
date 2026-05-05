import { Inject, Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import {
  AIMessage,
  AIMessageChunk,
  BaseMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from '@langchain/core/messages';
import { Runnable } from '@langchain/core/runnables';

@Injectable()
export class AiService {
  private readonly modelWithTools: Runnable<BaseMessage[], AIMessage>;

  constructor(
    @Inject('CHAT_MODEL') model: ChatOpenAI,
    @Inject('SEND_MAIL_TOOL') private readonly sendMailTool: any,
    @Inject('WEB_SEARCH_TOOL') private readonly webSearchTool: any,
    @Inject('DB_USERS_CRUD_TOOL') private readonly dbUsersCrudTool: any,
    @Inject('TIME_NOW_TOOL') private readonly timeNowTool: any,
    @Inject('CRON_JOB_TOOL') private readonly cronJobTool: any,
  ) {
    this.modelWithTools = model.bindTools([
      this.sendMailTool,
      this.webSearchTool,
      this.dbUsersCrudTool,
      this.timeNowTool,
      this.cronJobTool,
    ]);
  }

  async *runChainStream(query: string): AsyncIterable<string> {
    const messages: BaseMessage[] = [
      new SystemMessage(
        `你是一个通用任务助手，可以在需要时调用工具（如 \`query_user\`、\`db_users_crud\`、\`send_mail\`、\`web_search\`、\`time_now\`、\`cron_job\` 等）来查询或改写数据/配置，规划并执行各种任务（包括提醒、定期任务和一系列后台操作），再用结果回答用户的问题。

定时任务类型选择规则（非常重要）：
- “X分钟/小时/天后”“在某个时间点”“到点提醒”（一次性）=> \`cron_job.type=at\`（执行一次后自动停用）
- “每X分钟/每小时/每天”“定期/循环/一直”（重复执行）=> \`cron_job.type=every\`（每次执行），\`everyMs\`=毫秒
- 给出 Cron 表达式 => \`cron_job.type=cron\``,
      ),
      new HumanMessage(query),
    ];

    while (true) {
      // 一轮对话：先让模型思考并（可能）提出工具调用
      const stream = await this.modelWithTools.stream(messages);

      let fullAIMessage: AIMessageChunk | null = null;

      //   for await (const chunk of stream as AsyncIterable<AIMessageChunk>) {
      //     // 使用 concat 持续拼接，得到本轮完整的 AIMessageChunk
      //     fullAIMessage = fullAIMessage ? fullAIMessage.concat(chunk) : chunk;

      //     const hasToolCallChunk =
      //       !!fullAIMessage.tool_call_chunks &&
      //       fullAIMessage.tool_call_chunks.length > 0;

      //     // 只要当前轮次还没出现 tool 调用的 chunk，就可以把文本内容流式往外推
      //     if (!hasToolCallChunk && chunk.content) {
      //         yield chunk.content as string
      //     }
      //   }
      for await (const chunk of stream as AsyncIterable<AIMessageChunk>) {
        fullAIMessage = fullAIMessage ? fullAIMessage.concat(chunk) : chunk;

        // 只要 fullAIMessage 里一旦出现了任何工具调用的影子
        const isToolCalling = (fullAIMessage.tool_call_chunks?.length ?? 0) > 0;

        // 只有在确定不是工具调用时，才 yield content
        if (!isToolCalling && chunk.content) {
          yield chunk.content as string;
        }
      }

      if (!fullAIMessage) {
        return;
      }

      messages.push(fullAIMessage);

      const toolCalls = fullAIMessage.tool_calls ?? [];

      // 没有工具调用：说明这一轮就是最终回答，已经在上面的 for-await 中流完了，可以结束
      if (!toolCalls.length) {
        return;
      }

      // 有工具调用：本轮我们不再额外输出内容，而是执行工具，生成 ToolMessage，进入下一轮
      for (const toolCall of toolCalls) {
        const toolCallId = toolCall.id || '';
        const toolName = toolCall.name;

        if (toolName === 'send_mail') {
          const result = await this.sendMailTool.invoke(toolCall.args);

          messages.push(
            new ToolMessage({
              tool_call_id: toolCallId,
              name: toolName,
              content: result,
            }),
          );
        } else if (toolName === 'web_search') {
          const result = await this.webSearchTool.invoke(toolCall.args);

          messages.push(
            new ToolMessage({
              tool_call_id: toolCallId,
              name: toolName,
              content: result,
            }),
          );
        } else if (toolName === 'db_users_crud') {
          const result = await this.dbUsersCrudTool.invoke(toolCall.args);

          messages.push(
            new ToolMessage({
              tool_call_id: toolCallId,
              name: toolName,
              content: result,
            }),
          );
        } else if (toolName === 'time_now') {
          const result = await this.timeNowTool.invoke({});

          messages.push(
            new ToolMessage({
              tool_call_id: toolCallId,
              name: toolName,
              content: JSON.stringify(result),
            }),
          );
        } else if (toolName === 'cron_job') {
          const result = await this.cronJobTool.invoke(toolCall.args);

          messages.push(
            new ToolMessage({
              tool_call_id: toolCallId,
              name: toolName,
              content: result,
            }),
          );
        }
      }
    }
  }
}