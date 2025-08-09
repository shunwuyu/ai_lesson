import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    private todos: Todo[] = [];
    findAll(): Todo[] {
        // 返回浅拷贝，避免外部修改内部状态
        return [...this.todos];
    }
    create(createDto: CreateTodoDto): Todo {
        const todo: Todo = {
            id: uuidv4(),
            title: createDto.title,
            completed: createDto.completed ?? false,
        }
        this.todos.push(todo);
        return { ...todo };
    }
    findOne(id: string): Todo {
        const todo = this.todos.find((t) => t.id === id);
        if (!todo) {
          throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return { ...todo };
    }
    
    remove(id: string): void {
        console.log(id, '0102')
        const idx = this.todos.findIndex((t) => t.id === id);
        if (idx === -1) throw new NotFoundException(`Todo with id ${id} not found`);
        this.todos.splice(idx, 1);
    }
    update(id: string, updateDto: UpdateTodoDto): Todo {
        const idx = this.todos.findIndex((t) => t.id === id);
        if (idx === -1) throw new NotFoundException(`Todo with id ${id} not found`);
    
        const current = this.todos[idx];
        const updated: Todo = {
          ...current,
          ...updateDto
        };
        this.todos[idx] = updated;
        return { ...updated };
    }
}
