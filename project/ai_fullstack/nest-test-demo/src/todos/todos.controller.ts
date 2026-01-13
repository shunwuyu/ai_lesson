// src/todos/todos.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.findAll();
  }

  @Post()
  addTodo(@Body('title') title: string) {
    return this.todosService.addTodo(title);
  }
}
