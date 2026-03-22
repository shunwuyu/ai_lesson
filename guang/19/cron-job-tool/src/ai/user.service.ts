import { Injectable } from'@nestjs/common';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

@Injectable()
export class UserService {
  private readonly users = new Map<string, User>([
    ['001', { id: '001', name: '赵云', email: 'zhaoyun@example.com', role: 'admin' }],
    ['002', { id: '002', name: '诸葛亮', email: 'zhugeliang@example.com', role: 'manager' }],
    ['003', { id: '003', name: '关羽', email: 'guanyu@example.com', role: 'user' }],
    ['004', { id: '004', name: '张飞', email: 'zhangfei@example.com', role: 'user' }],
    ['005', { id: '005', name: '刘备', email: 'liubei@example.com', role: 'owner' }],
    ['006', { id: '006', name: '黄忠', email: 'huangzhong@example.com', role: 'user' }],
  ]);
  // 定义了 mock 的增删改查
  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findOne(id: string): User | undefined {
    return this.users.get(id);
  }

  create(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  update(id: string, partial: Partial<Omit<User, 'id'>>): User | undefined {
    const existing = this.users.get(id);
    if (!existing) {
      return undefined;
    }

    const updated: User = {
      ...existing,
      ...partial,
      id: existing.id,
    };

    this.users.set(id, updated);
    return updated;
  }

  remove(id: string): boolean {
    return this.users.delete(id);
  }
}