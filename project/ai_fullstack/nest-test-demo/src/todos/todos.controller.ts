// src/todos/todos.controller.ts
import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
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
  // ParseIntPipe 是 NestJS 内置的参数转换管道，能自动把字符串类型的路由或查询参数安全地转为整数，无效时返回 400 错误。
  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteTodo(id);
  }
}
