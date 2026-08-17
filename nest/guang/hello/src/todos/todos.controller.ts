import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import type { Todo } from './todos.service';

// 全局前缀 /todos
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // GET /todos 查全部
  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  // GET /todos/:id 查单个
  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    return this.todosService.findOne(Number(id));
  }

  // POST /todos 新增
  @Post()
  create(@Body('title') title: string): Todo {
    return this.todosService.create(title);
  }

  // PUT /todos/:id 更新
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() patch: Partial<Todo>,
  ): Todo {
    return this.todosService.update(Number(id), patch);
  }

  // DELETE /todos/:id 删除
  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.todosService.remove(Number(id));
    return { message: '删除成功' };
  }
}
