import { Module, forwardRef } from '@nestjs/common';
import { JobService } from './job.service';
import { JobAgentService } from '../ai/job-agent.service';
import { ToolModule } from 'src/tool/tool.module';

@Module({
  // 注入 ToolModule 是为了使用 ToolModule 中的工具
  imports: [forwardRef(() => ToolModule)],
  providers: [JobService, JobAgentService],
  exports: [JobService]
})
export class JobModule {}
