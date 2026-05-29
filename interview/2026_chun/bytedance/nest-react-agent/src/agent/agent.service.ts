// onModuleInit 在应用 启动、依赖注入完成 时就会跑
// 用户访问/agent/flight?q=xxx 时，llm 和 agent 都准备好了
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ChatOpenAI } from "@langchain/openai";
// 创建 ReAct Agent
// createReactAgent 是 LangGraph 提供的一个开箱即用的高阶函数，
// 能让你仅通过传入大语言模型（LLM）和工具集（Tools），
// 快速构建出一个具备“思考-行动-观察”（ReAct）循环能力的 AI 
// 智能体（Agent）。
// LangGraph 是 LangChain 框架中专门用于构建有状态、多参与者、可循环的复杂 AI 智能体（Agent）和工作流的底层编排引擎。
import { createReactAgent } from "@langchain/langgraph/prebuilt";
//MemorySaver 是 LangGraph 提供的一个内存版检查点存储器，
// 它能让你的 AI 智能体（Agent）在同一个会话中“记住”之前的对话
// 历史和执行状态，实现多轮连续交互。
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { FLIGHT_TOOLS } from "../tools/flight.tools";
import { Observable } from "rxjs";

@Injectable()
export class AgentService implements OnModuleInit {
  private agent;
  private memory = new MemorySaver();

  async onModuleInit() {
    const llm = new ChatOpenAI({
      model: "qwen3.6-plus",
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
      }
    });

    this.agent = createReactAgent({
      llm,
      tools: FLIGHT_TOOLS,
      // 检查点存储器，用于存储 Agent 的对话历史和执行状态
      checkpointSaver: this.memory,
      prompt: `你是航班查询助手，严格按 ReAct 执行：Thought → Action → Observation`,
    });
  }

  async run(query: string) {
    // 配置 Agent 的会话 ID，用于区分不同的会话
    const config = { configurable: { thread_id: "flight_agent" } };
    // 流式输出 Agent 的思考、行动和观察过程
    const stream = await this.agent.stream(
      { messages: [new HumanMessage(query)] },
      config
    );

    for await (const chunk of stream) {
      if ("agent" in chunk) console.log("\n🤖 Thought:", chunk.agent.messages[0].content);
      if ("tools" in chunk) console.log("🔧 Action:", chunk.tools.messages[0].content);
    }
    // 获取 Agent 的最终状态
    const state = await this.agent.getState(config);
    // 返回 Agent 的最终答案
    return state.values.messages.at(-1).content;
  }

  streamRun(query: string): Observable<any> {
    return new Observable((observer) => {
      (async () => {
        try {
          const config = {
            configurable: { thread_id: "flight_agent_stream" },
          };

          const stream = await this.agent.stream(
            { messages: [new HumanMessage(query)] },
            config
          );

          for await (const chunk of stream) {
            // 1. Agent 思考过程
            if ("agent" in chunk) {
              const content = chunk.agent.messages[0].content;
              if (content) {
                observer.next({
                  type: "thought",
                  data: content,
                });
              }
            }

            // 2. 工具调用 & 执行结果
            if ("tools" in chunk) {
              const content = chunk.tools.messages[0].content;
              observer.next({
                type: "action",
                data: content,
              });
            }
          }

          // 3. 最终结果
          const state = await this.agent.getState(config);
          const final = state.values.messages.at(-1).content;
          observer.next({
            type: "final",
            data: final,
          });

          observer.complete();
        } catch (err) {
          observer.error({
            type: "error",
            data: err.message,
          });
        }
      })();
    });
  }
}