import { Test, TestingModule } from '@nestjs/testing';
import { AiDiaryService } from './ai-diary.service';

describe('AiDiaryService', () => {
  let service: AiDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiDiaryService],
    }).compile();

    service = module.get<AiDiaryService>(AiDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
