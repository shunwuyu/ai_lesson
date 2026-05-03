import { Inject, Injectable } from '@nestjs/common';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { JobService } from '../job/job.service';

@Injectable()
export class CronJobToolService {
  readonly tool;

  @Inject(JobService)
  private readonly jobService: JobService;

  constructor() {
    const cronJobArgsSchema = z.object({
      action: z
        .enum(['list', 'add', 'toggle'])
        .describe('要执行的操作：list、add、toggle'),
      id: z.string().optional().describe('任务 ID（toggle 时需要）'),
      enabled: z
        .boolean()
        .optional()
        .describe('是否启用（toggle 可选；不传则自动取反）'),
      type: z
        .enum(['cron', 'every', 'at'])
        .optional()
        .describe(
          '任务类型（add 时需要）：cron（按 Cron 表达式循环执行）/ every（按固定间隔毫秒循环执行）/ at（在指定时间点执行一次，执行后自动停用）',
        ),
      instruction: z
        .string()
        .optional()
        .describe(
          '任务说明/指令（add 时需要）。要求：\n1) 从用户自然语言中去掉“什么时候执行”的定时部分后，保留纯粹要执行的任务内容。\n2) 必须是自然语言描述，不能是工具调用或代码（例如不能写 send_mail(...) / db_users_crud(...) / web_search(...)）。\n3) 不要擅自补全细节或改写成脚本。',
        ),
      cron: z
        .string()
        .optional()
        .describe('Cron 表达式（type=cron 时需要，例如 */5 * * * * *）'),
      everyMs: z
        .number()
        .int()
        .positive()
        .optional()
        .describe('固定间隔毫秒（type=every 时需要，例如 60000 表示每分钟执行一次）'),
      at: z
        .string()
        .optional()
        .describe(
          '指定触发时间点（type=at 时需要，ISO 字符串，例如 2026-03-18T12:34:56.000Z；到点执行一次后自动停用）',
        ),
    });

    this.tool = tool(
      async ({
        action,
        id,
        enabled,
        type,
        instruction,
        cron,
        everyMs,
        at,
      }: {
        action: 'list' | 'add' | 'toggle';
        id?: string;
        enabled?: boolean;
        type?: 'cron' | 'every' | 'at';
        instruction?: string;
        cron?: string;
        everyMs?: number;
        at?: string;
      }) => {
        switch (action) {
          case 'list': {
            const jobs = await this.jobService.listJobs();
            if (!jobs.length) return '当前没有任何定时任务。';
            const lines = jobs
              .map((j: any) => {
                return `id=${j.id} type=${j.type} enabled=${j.isEnabled} running=${j.running} cron=${j.cron ?? ''} everyMs=${j.everyMs ?? ''} at=${j.at instanceof Date ? j.at.toISOString() : j.at ?? ''} instruction=${j.instruction ?? ''}`;
              })
              .join('\n');
            return `当前定时任务列表（type 说明：cron=按表达式循环；every=按间隔循环；at=到点执行一次后自动停用）：\n${lines}`;
          }
          case 'add': {
            if (!type) return '新增任务需要提供 type（cron/every/at）。';
            if (!instruction) return '新增任务需要提供 instruction。';

            if (type === 'cron') {
              if (!cron) return 'type=cron 时需要提供 cron。';
              const created = await this.jobService.addJob({
                type,
                instruction,
                cron,
                isEnabled: true,
              });
              return `已新增定时任务：id=${(created as any).id} type=cron cron=${(created as any).cron} enabled=${(created as any).isEnabled}`;
            }

            if (type === 'every') {
              if (typeof everyMs !== 'number' || everyMs <= 0) {
                return 'type=every 时需要提供 everyMs（正整数，单位毫秒）。';
              }
              const created = await this.jobService.addJob({
                type,
                instruction,
                everyMs,
                isEnabled: true,
              });
              return `已新增定时任务：id=${(created as any).id} type=every everyMs=${(created as any).everyMs} enabled=${(created as any).isEnabled}`;
            }

            if (type === 'at') {
              if (!at) return 'type=at 时需要提供 at（ISO 时间字符串）。';
              const date = new Date(at);
              if (Number.isNaN(date.getTime())) {
                return 'type=at 的 at 不是合法的 ISO 时间字符串。';
              }
              const created = await this.jobService.addJob({
                type,
                instruction,
                at: date,
                isEnabled: true,
              });
              return `已新增定时任务：id=${(created as any).id} type=at at=${(created as any).at?.toISOString?.() ?? ''} enabled=${(created as any).isEnabled}`;
            }

            return `不支持的任务类型: ${type}`;
          }
          case 'toggle': {
            if (!id) return 'toggle 任务需要提供 id。';
            const updated = await this.jobService.toggleJob(id, enabled);
            return `已更新任务状态：id=${(updated as any).id} enabled=${(updated as any).isEnabled}`;
          }
          default:
            return `不支持的操作: ${action}`;
        }
      },
      {
        name: 'cron_job',
        description:
          '管理服务端定时任务（支持 list/add/toggle）。\n\n类型语义：\n- type=at：到指定时间点只执行一次，执行后自动停用。\n- type=every：按固定毫秒间隔循环执行。\n- type=cron：按 Cron 表达式循环执行。\n',
        schema: cronJobArgsSchema,
      },
    );
  }
}
