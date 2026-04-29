import { Module } from "@nestjs/common";
import { AgentController } from "./agent.controller";
import { AgentService } from "./agent.service";

@Module({
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}