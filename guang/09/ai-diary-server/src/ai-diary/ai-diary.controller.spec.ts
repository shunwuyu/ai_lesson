import { Test, TestingModule } from '@nestjs/testing';
import { AiDiaryController } from './ai-diary.controller';
import { AiDiaryService } from './ai-diary.service';

describe('AiDiaryController', () => {
  let controller: AiDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiDiaryController],
      providers: [AiDiaryService],
    }).compile();

    controller = module.get<AiDiaryController>(AiDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
