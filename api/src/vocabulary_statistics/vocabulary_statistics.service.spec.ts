import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyStatisticsService } from './vocabulary_statistics.service';

describe('VocabularyStatisticsService', () => {
  let service: VocabularyStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocabularyStatisticsService],
    }).compile();

    service = module.get<VocabularyStatisticsService>(VocabularyStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
