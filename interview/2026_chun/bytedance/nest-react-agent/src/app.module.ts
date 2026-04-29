import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AgentModule } from "./agent/agent.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AgentModule, // 只引入模块，干净整洁
  ],
})
export class AppModule {}