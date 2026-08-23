import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { REDIS_CLIENT } from './redis-client.provider';
import type { TodoRedisClient } from './redis-client.provider';
import { Todo } from './todo.model';

const TITLE_MAX_LENGTH = 200;
const TODOS_REDIS_KEY = 'todos';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: TodoRedisClient) {}

  async create(dto: CreateTodoDto): Promise<Todo> {
    const title = this.normalizeTitle(dto?.title);

    const todo: Todo = {
      id: randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    await this.runRedisCommand(() =>
      this.redis.hSet(TODOS_REDIS_KEY, todo.id, JSON.stringify(todo)),
    );

    this.logger.log(`todo created: ${todo.id}`);
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.runRedisCommand(async () => {
      const entries = await this.redis.hGetAll(TODOS_REDIS_KEY);
      const values =
        entries instanceof Map
          ? Array.from(entries.values())
          : Object.values(entries);
      return values.map((value) => JSON.parse(value) as Todo);
    });
  }

  async updateCompleted(id: string, dto: UpdateTodoDto): Promise<Todo> {
    if (typeof dto?.completed !== 'boolean') {
      throw new BadRequestException('completed must be a boolean');
    }

    const todo = await this.runRedisCommand(async () => {
      const raw = await this.redis.hGet(TODOS_REDIS_KEY, id);
      if (!raw) {
        return null;
      }

      const existing = JSON.parse(raw) as Todo;
      existing.completed = dto.completed;
      await this.redis.hSet(TODOS_REDIS_KEY, id, JSON.stringify(existing));
      return existing;
    });

    if (!todo) {
      throw new NotFoundException(`todo not found: ${id}`);
    }

    this.logger.log(`todo updated: ${id}`);
    return todo;
  }

  async remove(id: string): Promise<void> {
    const removed = await this.runRedisCommand(() =>
      this.redis.hDel(TODOS_REDIS_KEY, id),
    );

    if (removed === 0) {
      throw new NotFoundException(`todo not found: ${id}`);
    }

    this.logger.log(`todo removed: ${id}`);
  }

  private normalizeTitle(title: unknown): string {
    if (typeof title !== 'string') {
      throw new BadRequestException('title is required and must be a string');
    }

    const cleaned = title.trim();
    if (cleaned.length < 1 || cleaned.length > TITLE_MAX_LENGTH) {
      throw new BadRequestException(
        `title must be between 1 and ${TITLE_MAX_LENGTH} characters`,
      );
    }

    return cleaned;
  }

  private async runRedisCommand<T>(command: () => Promise<T>): Promise<T> {
    try {
      return await command();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`redis command failed: ${message}`);
      throw new ServiceUnavailableException('storage service unavailable');
    }
  }
}
