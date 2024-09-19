import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateController } from './user-create.controller';

describe('UserCreateController', () => {
  let controller: UserCreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
    }).compile();

    controller = module.get<UserCreateController>(UserCreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
