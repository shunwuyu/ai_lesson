import { forwardRef, Module } from'@nestjs/common';
import { UsersModule } from'../users/users.module';
import { LlmService } from'./llm.service';
import { SendMailToolService } from'./send-mail-tool.service';
import { WebSearchToolService } from'./web-search-tool.service';
import { DbUsersCrudToolService } from'./db-users-crud-tool.service';
import { TimeNowToolService } from'./time-now-tool.service';
import { CronJobToolService } from'./cron-job-tool.service';
import { JobModule } from'../job/job.module';

@Module({
imports: [UsersModule, forwardRef(() => JobModule)],
providers: [
    LlmService,
    SendMailToolService,
    WebSearchToolService,
    DbUsersCrudToolService,
    TimeNowToolService,
    CronJobToolService,
    {
      provide: 'CHAT_MODEL',
      useFactory: (llmService: LlmService) => llmService.getModel(),
      inject: [LlmService],
    },
    {
      provide: 'SEND_MAIL_TOOL',
      useFactory: (svc: SendMailToolService) => svc.tool,
      inject: [SendMailToolService],
    },
    {
      provide: 'WEB_SEARCH_TOOL',
      useFactory: (svc: WebSearchToolService) => svc.tool,
      inject: [WebSearchToolService],
    },
    {
      provide: 'DB_USERS_CRUD_TOOL',
      useFactory: (svc: DbUsersCrudToolService) => svc.tool,
      inject: [DbUsersCrudToolService],
    },
    {
      provide: 'TIME_NOW_TOOL',
      useFactory: (svc: TimeNowToolService) => svc.tool,
      inject: [TimeNowToolService],
    },
    {
      provide: 'CRON_JOB_TOOL',
      useFactory: (svc: CronJobToolService) => svc.tool,
      inject: [CronJobToolService],
    },
  ],
exports: [
    'CHAT_MODEL',
    'SEND_MAIL_TOOL',
    'WEB_SEARCH_TOOL',
    'DB_USERS_CRUD_TOOL',
    'TIME_NOW_TOOL',
    'CRON_JOB_TOOL',
  ],
})
export class ToolModule {}