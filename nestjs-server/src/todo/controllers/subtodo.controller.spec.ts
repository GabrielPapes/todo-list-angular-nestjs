import { Test, TestingModule } from '@nestjs/testing';
import { SubtodoController } from './subtodo.controller';

describe('SubtodoController', () => {
  let controller: SubtodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtodoController],
    }).compile();

    controller = module.get<SubtodoController>(SubtodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
