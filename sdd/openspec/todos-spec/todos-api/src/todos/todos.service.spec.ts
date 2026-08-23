import {
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { TodosService } from './todos.service';

function createFakeRedisClient() {
  const store = new Map<string, string>();

  return {
    store,
    hSet: jest.fn((_key: string, field: string, value: string) => {
      void _key;
      store.set(field, value);
      return Promise.resolve(1);
    }),
    hGetAll: jest.fn((_key: string) => {
      void _key;
      const entries: Record<string, string> = {};
      for (const [field, value] of store) {
        entries[field] = value;
      }
      return Promise.resolve(entries);
    }),
    hGet: jest.fn((_key: string, field: string) => {
      void _key;
      return Promise.resolve(store.get(field));
    }),
    hDel: jest.fn((_key: string, field: string) => {
      void _key;
      return Promise.resolve(store.delete(field) ? 1 : 0);
    }),
    disconnect: jest.fn(() => Promise.resolve()),
  };
}

describe('TodosService', () => {
  let service: TodosService;
  let redis: ReturnType<typeof createFakeRedisClient>;

  beforeEach(() => {
    redis = createFakeRedisClient();
    service = new TodosService(redis);
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const todo = await service.create({ title: 'Buy milk' });

      expect(todo.id).toBeDefined();
      expect(todo.title).toBe('Buy milk');
      expect(todo.completed).toBe(false);
      expect(todo.createdAt).toBeDefined();
    });

    it('should trim the title', async () => {
      const todo = await service.create({ title: '  Buy milk  ' });

      expect(todo.title).toBe('Buy milk');
    });

    it('should throw when title is missing', async () => {
      await expect(service.create({} as never)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw when title is not a string', async () => {
      await expect(service.create({ title: 123 } as never)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw when title is empty after trim', async () => {
      await expect(service.create({ title: '   ' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw when title exceeds max length', async () => {
      await expect(service.create({ title: 'a'.repeat(201) })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should map redis failures to service unavailable', async () => {
      redis.hSet.mockRejectedValueOnce(new Error('boom'));

      await expect(service.create({ title: 'Buy milk' })).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      await service.create({ title: 'first' });
      await service.create({ title: 'second' });

      await expect(service.findAll()).resolves.toHaveLength(2);
    });

    it('should map redis failures to service unavailable', async () => {
      redis.hGetAll.mockRejectedValueOnce(new Error('boom'));

      await expect(service.findAll()).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('updateCompleted', () => {
    it('should update completed status', async () => {
      const todo = await service.create({ title: 'Buy milk' });

      const updated = await service.updateCompleted(todo.id, {
        completed: true,
      });

      expect(updated.completed).toBe(true);
    });

    it('should throw when completed is not a boolean', async () => {
      const todo = await service.create({ title: 'Buy milk' });

      await expect(
        service.updateCompleted(todo.id, { completed: 'true' } as never),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw when todo is not found', async () => {
      await expect(
        service.updateCompleted('missing', { completed: true }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const todo = await service.create({ title: 'Buy milk' });

      await service.remove(todo.id);

      await expect(service.findAll()).resolves.toHaveLength(0);
    });

    it('should throw when todo is not found', async () => {
      await expect(service.remove('missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
