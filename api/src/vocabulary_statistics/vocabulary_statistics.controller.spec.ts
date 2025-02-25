import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyStatisticsController } from './vocabulary_statistics.controller';

describe('VocabularyStatisticsController', () => {
  let controller: VocabularyStatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocabularyStatisticsController],
    }).compile();

    controller = module.get<VocabularyStatisticsController>(VocabularyStatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
