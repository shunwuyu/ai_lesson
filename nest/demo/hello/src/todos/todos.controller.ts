import { Controller, Get, Post, HttpCode, HttpStatus, Body, Param, Patch, Delete } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    getAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Todo {
        return this.todosService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDto: CreateTodoDto): Todo {
        return this.todosService.create(createDto);
    }

    // 局部更新（PATCH）
    @Patch(':id')
    updatePatch(@Param('id') id: string, @Body() updateDto: UpdateTodoDto): Todo {
        console.log(id, 'update patch');
        return this.todosService.update(id, updateDto);
    }

    @Delete(':id')
    // 不返回响应体，适合删除操作
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): void {
        console.log(id, '?????')
        this.todosService.remove(id);
    }
}
