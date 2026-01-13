// src/todos/todos.service.ts
import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: '学习 NestJS', completed: false },
    { id: 2, title: '写 Todo 模块', completed: true },
  ];

  findAll() {
    return this.todos;
  }

  addTodo(title: string) {
    const todo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }
}
