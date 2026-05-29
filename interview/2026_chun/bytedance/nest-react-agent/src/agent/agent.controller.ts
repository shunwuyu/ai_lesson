import { Controller, Get, Query, Sse } from "@nestjs/common";
import { AgentService } from "./agent.service";
import { Observable } from "rxjs";

@Controller("agent")
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get("flight")
  async flight(@Query("q") q: string) {
    return this.agentService.run(q);
  }

  // 流式输出接口：SSE 实时返回思考过程 + 结果
  @Sse("stream/flight")
  async streamFlight(@Query("q") query: string): Promise<Observable<any>> {
    return this.agentService.streamRun(query);
  }
}