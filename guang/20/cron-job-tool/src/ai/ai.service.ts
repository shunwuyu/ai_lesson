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
        @Inject('DB_USERS_CRUD_TOOL') private readonly dbUsersCrudTool: any,
        @Inject('CRON_JOB_TOOL') private readonly cronJobTool: any
      ) {
        this.modelWithTools = model.bindTools([
            this.dbUsersCrudTool,
            this.cronJobTool
        ])
    }
    async *runChainStream(query: string): AsyncIterable<string> {
        const messages: BaseMessage[] = [
            new SystemMessage(
              `你是一个通用任务助手，可以根据用户的目标规划步骤，并在需要时调用工具：\`query_user\` 查询或校验用户信息、\`send_mail\` 发送邮件、\`web_search\` 进行互联网搜索、\`db_users_crud\` 读写数据库 users 表、\`cron_job\` 创建和管理定时/周期任务（\`list\`/\`add\`/\`toggle\`），从而实现提醒、定期任务、数据同步等各种自动化需求。

定时任务类型选择规则（非常重要）：
- 用户说“X分钟/小时/天后”“在某个时间点”“到点提醒”（一次性）=> 用 \`cron_job\` + \`type=at\`（执行一次后自动停用），\`at\`=当前时间+X 或解析出的时间点
- 用户说“每X分钟/每小时/每天”“定期/循环/一直”（重复执行）=> 用 \`cron_job\` + \`type=every\`（每次执行），\`everyMs\`=X换算成毫秒
- 用户给出 Cron 表达式或明确说“用 cron 表达式”（重复执行）=> 用 \`cron_job\` + \`type=cron\`

在调用 \`cron_job.add\` 创建任务时，需要把用户原始自然语言拆成两部分：一部分是“什么时候执行”（用来决定 type/at/everyMs/cron），另一部分是“要做什么任务本身”。\`instruction\` 字段只能填“要做什么”的那部分文本（保持原语言和原话），不能再改写、翻译或总结。

当用户请求“在未来某个时间点执行某个动作”（例如“1分钟后给我发一个笑话到邮箱”）时，本轮对话只需要使用 \`cron_job\` 设置/更新定时任务，不要在当前轮直接完成这个动作本身：不要直接调用 \`send_mail\` 给他发邮件，也不要在当前轮就真正“执行”指令，只需把要执行的动作写进 \`instruction\` 里，交给将来的定时任务去跑。

注意：像“\`1分钟后提醒我喝水\`”，时间相关信息用于计算下一次执行时间，而 \`instruction\` 应该是“提醒我喝水”；本轮不需要立刻提醒。`
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
                } else if (toolName === 'cron_job') {
                    const result = await this.cronJobTool.invoke(toolCall.args);
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
