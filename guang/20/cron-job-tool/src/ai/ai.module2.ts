import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { z } from 'zod';
import { tool } from '@langchain/core/tools'
import { ConfigService } from '@nestjs/config';
import {
  ChatOpenAI
} from '@langchain/openai';
import { JobModule } from 'src/job/job.module';
import { JobService } from 'src/job/job.service';
// import { ToolModule } from '../tool/tool.module';

@Module({
  imports: [ 
    UsersModule, 
    // ToolModule, 
    JobModule 
  ],
  controllers: [AiController],
  providers: [
    AiService,
    UsersService,
    {
      provide: 'CHAT_MODEL',
      // 注入 ConfigService 实例
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new ChatOpenAI({
          model: configService.get('MODEL_NAME'),
          apiKey: configService.get('OPENAI_API_KEY'),
          configuration: {
            baseURL: configService.get('OPENAI_BASE_URL'),
          },
        })
      }
    },
    {
      provide: 'CRON_JOB_TOOL',
      useFactory: (jobService: JobService) => {
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
            .describe('任务说明/指令（add 时需要）。要求：\n1) 从用户自然语言中去掉“什么时候执行”的定时部分后，保留纯粹要执行的任务内容。\n2) 必须是自然语言描述，不能是工具调用或代码（例如不能写 send_mail(...) / db_users_crud(...) / web_search(...)）。\n3) 不要擅自补全细节或改写成脚本。'),
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
    
        return tool(
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
              case'list': {
                const jobs = await jobService.listJobs();
                if (!jobs.length) return'当前没有任何定时任务。';
                const lines = jobs
                  .map((j: any) => {
                    return`id=${j.id} type=${j.type} enabled=${j.isEnabled} running=${j.running} cron=${j.cron ?? ''} everyMs=${j.everyMs ?? ''} at=${j.at instanceof Date ? j.at.toISOString() : j.at ?? ''} instruction=${j.instruction ?? ''}`;
                  })
                  .join('\n');
                return`当前定时任务列表（type 说明：cron=按表达式循环；every=按间隔循环；at=到点执行一次后自动停用）：\n${lines}`;
              }
              case'add': {
                if (!type) return'新增任务需要提供 type（cron/every/at）。';
                if (!instruction) return'新增任务需要提供 instruction。';
    
                if (type === 'cron') {
                  if (!cron) return'type=cron 时需要提供 cron。';
                  const created = await jobService.addJob({
                    type,
                    instruction,
                    cron,
                    isEnabled: true,
                  });
                  return`已新增定时任务：id=${(created as any).id} type=cron cron=${(created as any).cron} enabled=${(created as any).isEnabled}`;
                }
    
                if (type === 'every') {
                  if (typeof everyMs !== 'number' || everyMs <= 0) {
                    return'type=every 时需要提供 everyMs（正整数，单位毫秒）。';
                  }
                  const created = await jobService.addJob({
                    type,
                    instruction,
                    everyMs,
                    isEnabled: true,
                  });
                  return`已新增定时任务：id=${(created as any).id} type=every everyMs=${(created as any).everyMs} enabled=${(created as any).isEnabled}`;
                }
    
                if (type === 'at') {
                  if (!at) return'type=at 时需要提供 at（ISO 时间字符串）。';
                  const date = new Date(at);
                  if (Number.isNaN(date.getTime())) {
                    return'type=at 的 at 不是合法的 ISO 时间字符串。';
                  }
                  const created = await jobService.addJob({
                    type,
                    instruction,
                    at: date,
                    isEnabled: true,
                  });
                  return`已新增定时任务：id=${(created as any).id} type=at at=${(created as any).at?.toISOString?.() ?? ''} enabled=${(created as any).isEnabled}`;
                }
    
                return`不支持的任务类型: ${type}`;
              }
              case'toggle': {
                if (!id) return'toggle 任务需要提供 id。';
                const updated = await jobService.toggleJob(id, enabled);
                return`已更新任务状态：id=${(updated as any).id} enabled=${(updated as any).isEnabled}`;
              }
              default:
                return`不支持的操作: ${action}`;
            }
          },
          {
            name: 'cron_job',
            description:
              '管理服务端定时任务（支持 list/add/toggle）。\n\n类型语义：\n- type=at：到指定时间点只执行一次，执行后自动停用。适用于“1分钟后提醒我喝水”“明天 9 点提醒我开会”。\n- type=every：按固定毫秒间隔循环执行，适用于“每 1 分钟提醒我喝水”。\n- type=cron：按 Cron 表达式循环执行。\n',
            schema: cronJobArgsSchema,
          },
        );
      },
    inject: [JobService],
    },
    {
      provide: 'DB_USERS_CRUD_TOOL',
    useFactory: (usersService: UsersService) => {
        const dbUsersCrudArgsSchema = z.object({
          action: z
            .enum(['create', 'list', 'get', 'update', 'delete'])
            .describe('要执行的操作：create、list、get、update、delete'),
          id: z
            .number()
            .int()
            .positive()
            .optional()
            .describe('用户 ID（get / update / delete 时需要）'),
          name: z
            .string()
            .min(1)
            .max(50)
            .optional()
            .describe('用户姓名（create 或 update 时可用）'),
          email: z
            .string()
            .email()
            .max(50)
            .optional()
            .describe('用户邮箱（create 或 update 时可用）'),
        });
    
        return tool(
          async ({
            action,
            id,
            name,
            email,
          }: {
            action: 'create' | 'list' | 'get' | 'update' | 'delete';
            id?: number;
            name?: string;
            email?: string;
          }) => {
            switch (action) {
              case'create': {
                if (!name || !email) {
                  return'创建用户需要同时提供 name 和 email。';
                }
                const created = await usersService.create({ name, email });
                return`已创建用户：ID=${(created as any).id}，姓名=${(created as any).name}，邮箱=${(created as any).email}`;
              }
              case'list': {
                const users = await usersService.findAll();
                if (!users.length) {
                  return'数据库中还没有任何用户记录。';
                }
                const lines = users
                  .map(
                    (u: any) =>
                      `ID=${u.id}，姓名=${u.name}，邮箱=${u.email}，创建时间=${u.createdAt?.toISOString?.() ?? ''}`,
                  )
                  .join('\n');
                return`当前数据库 users 表中的用户列表：\n${lines}`;
              }
              case'get': {
                if (!id) {
                  return'查询单个用户需要提供 id。';
                }
                const user = await usersService.findOne(id);
                if (!user) {
                  return`ID 为 ${id} 的用户在数据库中不存在。`;
                }
                const u: any = user;
                return`用户信息：ID=${u.id}，姓名=${u.name}，邮箱=${u.email}，创建时间=${u.createdAt?.toISOString?.() ?? ''}`;
              }
              case'update': {
                if (!id) {
                  return'更新用户需要提供 id。';
                }
                const payload: any = {};
                if (name !== undefined) payload.name = name;
                if (email !== undefined) payload.email = email;
                if (!Object.keys(payload).length) {
                  return'未提供需要更新的字段（name 或 email），本次不执行更新。';
                }
                const existing = await usersService.findOne(id);
                if (!existing) {
                  return`ID 为 ${id} 的用户在数据库中不存在。`;
                }
                await usersService.update(id, payload);
                const updated: any = await usersService.findOne(id);
                return`已更新用户：ID=${id}，姓名=${updated?.name}，邮箱=${updated?.email}`;
              }
              case'delete': {
                if (!id) {
                  return'删除用户需要提供 id。';
                }
                const existing: any = await usersService.findOne(id);
                if (!existing) {
                  return`ID 为 ${id} 的用户在数据库中不存在，无需删除。`;
                }
                await usersService.remove(id);
                return`已删除用户：ID=${id}，姓名=${existing.name}，邮箱=${existing.email}`;
              }
              default:
                return`不支持的操作: ${action}`;
            }
          },
          {
            name: 'db_users_crud',
            description:
              '对数据库 users 表执行增删改查操作。通过 action 字段选择 create/list/get/update/delete，并按需提供 id、name、email 等参数。',
            schema: dbUsersCrudArgsSchema,
          },
        );
      },
    inject: [UsersService],
    },
  ],
})
export class AiModule {}
