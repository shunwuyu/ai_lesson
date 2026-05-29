import { Inject, Injectable } from '@nestjs/common';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { UsersService } from '../users/users.service';

@Injectable()
export class DbUsersCrudToolService {
  readonly tool;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  constructor() {
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
        .email()
        .max(50)
        .optional()
        .describe('用户邮箱（create 或 update 时可用）'),
    });

    this.tool = tool(
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
          case 'create': {
            if (!name || !email) {
              return '创建用户需要同时提供 name 和 email。';
            }
            const created = await this.usersService.create({ name, email });
            return `已创建用户：ID=${(created as any).id}，姓名=${(created as any).name}，邮箱=${(created as any).email}`;
          }
          case 'list': {
            const users = await this.usersService.findAll();
            if (!users.length) {
              return '数据库中还没有任何用户记录。';
            }
            const lines = users
              .map(
                (u: any) =>
                  `ID=${u.id}，姓名=${u.name}，邮箱=${u.email}，创建时间=${u.createdAt?.toISOString?.() ?? ''}`,
              )
              .join('\n');
            return `当前数据库 users 表中的用户列表：\n${lines}`;
          }
          case 'get': {
            if (!id) {
              return '查询单个用户需要提供 id。';
            }
            const user = await this.usersService.findOne(id);
            if (!user) {
              return `ID 为 ${id} 的用户在数据库中不存在。`;
            }
            const u: any = user;
            return `用户信息：ID=${u.id}，姓名=${u.name}，邮箱=${u.email}，创建时间=${u.createdAt?.toISOString?.() ?? ''}`;
          }
          case 'update': {
            if (!id) {
              return '更新用户需要提供 id。';
            }
            const payload: any = {};
            if (name !== undefined) payload.name = name;
            if (email !== undefined) payload.email = email;
            if (!Object.keys(payload).length) {
              return '未提供需要更新的字段（name 或 email），本次不执行更新。';
            }
            const existing = await this.usersService.findOne(id);
            if (!existing) {
              return `ID 为 ${id} 的用户在数据库中不存在。`;
            }
            await this.usersService.update(id, payload);
            const updated: any = await this.usersService.findOne(id);
            return `已更新用户：ID=${id}，姓名=${updated?.name}，邮箱=${updated?.email}`;
          }
          case 'delete': {
            if (!id) {
              return '删除用户需要提供 id。';
            }
            const existing: any = await this.usersService.findOne(id);
            if (!existing) {
              return `ID 为 ${id} 的用户在数据库中不存在，无需删除。`;
            }
            await this.usersService.remove(id);
            return `已删除用户：ID=${id}，姓名=${existing.name}，邮箱=${existing.email}`;
          }
          default:
            return `不支持的操作: ${action}`;
        }
      },
      {
        name: 'db_users_crud',
        description:
          '对数据库 users 表执行增删改查操作。通过 action 字段选择 create/list/get/update/delete，并按需提供 id、name、email 等参数。',
        schema: dbUsersCrudArgsSchema,
      },
    );
  }
}