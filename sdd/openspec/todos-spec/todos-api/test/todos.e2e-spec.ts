import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { REDIS_CLIENT } from './../src/todos/redis-client.provider';
import type { Todo } from './../src/todos/todo.model';
import { createFakeRedisClient } from './fake-redis-client';

async function createApp(
  store: Map<string, string>,
): Promise<INestApplication<App>> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(REDIS_CLIENT)
    .useValue(createFakeRedisClient(store))
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
}

describe('TodosController (e2e)', () => {
  describe('CRUD', () => {
    let app: INestApplication<App>;
    let store: Map<string, string>;

    beforeEach(async () => {
      store = new Map<string, string>();
      app = await createApp(store);
    });

    afterEach(async () => {
      await app.close();
    });

    describe('POST /todos', () => {
      it('should create a todo', async () => {
        const response = await request(app.getHttpServer())
          .post('/todos')
          .send({ title: 'Buy milk' })
          .expect(201);

        const todo = response.body as Todo;

        expect(todo.id).toBeDefined();
        expect(todo.title).toBe('Buy milk');
        expect(todo.completed).toBe(false);
        expect(todo.createdAt).toBeDefined();
      });

      it('should return 400 when title is invalid', async () => {
        await request(app.getHttpServer())
          .post('/todos')
          .send({ title: '   ' })
          .expect(400);
      });
    });

    describe('GET /todos', () => {
      it('should return all todos', async () => {
        await request(app.getHttpServer())
          .post('/todos')
          .send({ title: 'first' })
          .expect(201);

        const response = await request(app.getHttpServer())
          .get('/todos')
          .expect(200);

        const todos = response.body as Todo[];

        expect(Array.isArray(todos)).toBe(true);
        expect(todos).toHaveLength(1);
      });
    });

    describe('PATCH /todos/:id', () => {
      it('should update completed status', async () => {
        const created = await request(app.getHttpServer())
          .post('/todos')
          .send({ title: 'Buy milk' })
          .expect(201);

        const createdTodo = created.body as Todo;

        const response = await request(app.getHttpServer())
          .patch(`/todos/${createdTodo.id}`)
          .send({ completed: true })
          .expect(200);

        const todo = response.body as Todo;

        expect(todo.completed).toBe(true);
      });

      it('should return 404 when todo is not found', async () => {
        await request(app.getHttpServer())
          .patch('/todos/missing')
          .send({ completed: true })
          .expect(404);
      });
    });

    describe('DELETE /todos/:id', () => {
      it('should delete a todo', async () => {
        const created = await request(app.getHttpServer())
          .post('/todos')
          .send({ title: 'Buy milk' })
          .expect(201);

        const createdTodo = created.body as Todo;

        await request(app.getHttpServer())
          .delete(`/todos/${createdTodo.id}`)
          .expect(204);
      });

      it('should return 404 when todo is not found', async () => {
        await request(app.getHttpServer()).delete('/todos/missing').expect(404);
      });
    });
  });

  describe('persistence', () => {
    it('should keep todos after an app restart', async () => {
      const store = new Map<string, string>();

      const firstApp = await createApp(store);
      await request(firstApp.getHttpServer())
        .post('/todos')
        .send({ title: 'persist me' })
        .expect(201);
      await firstApp.close();

      const secondApp = await createApp(store);
      const response = await request(secondApp.getHttpServer())
        .get('/todos')
        .expect(200);

      const todos = response.body as Todo[];
      expect(todos).toHaveLength(1);
      expect(todos[0].title).toBe('persist me');
      await secondApp.close();
    });
  });
});
