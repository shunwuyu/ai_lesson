import type { TodoRedisClient } from '../src/todos/redis-client.provider';

export function createFakeRedisClient(
  store: Map<string, string>,
): TodoRedisClient {
  return {
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
