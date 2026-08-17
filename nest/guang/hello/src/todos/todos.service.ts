import { Injectable, NotFoundException } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// 内存数据（临时，重启丢失）
let todos: Todo[] = [
  { id: 1, title: '学习 NestJS', completed: false },
  { id: 2, title: '写 CRUD', completed: true },
];

let nextId = 3;

@Injectable()
export class TodosService {
  // 查询全部
  findAll(): Todo[] {
    return todos;
  }

  // 按 id 查询单个
  findOne(id: number): Todo {
    const todo = todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException(`Todo ${id} 不存在`);
    return todo;
  }

  // 新增
  create(title: string): Todo {
    const todo: Todo = { id: nextId++, title, completed: false };
    todos.push(todo);
    return todo;
  }

  // 更新（支持改 title 和 completed）
  update(id: number, patch: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, patch);
    return todo;
  }

  // 删除
  remove(id: number): void {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Todo ${id} 不存在`);
    todos.splice(index, 1);
  }
}
