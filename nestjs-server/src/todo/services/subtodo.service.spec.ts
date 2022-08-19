import { Test, TestingModule } from '@nestjs/testing';
import { SubtodoService } from './subtodo.service';

describe('SubtodoService', () => {
  let service: SubtodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtodoService],
    }).compile();

    service = module.get<SubtodoService>(SubtodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
