// src/todos/todos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id:1,
      title: '学习nest.js',
      completed: false
    },
    {
      id:2,
      title: '学习docker',
      completed: true
    }
  ];
  private nextId = 1;

  // 新增
  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  // 查询所有
  findAll(): Todo[] {
    return this.todos;
  }

  // 查询单个
  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      // 严谨的后端容错：找不到直接抛出 404 异常，Nest 会自动处理
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  // 更新
  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  // 删除
  remove(id: number): { message: string } {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    this.todos.splice(index, 1);
    return { message: 'Deleted successfully' };
  }
}