import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyService } from './vocabulary.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vocabulary } from '../vocabulary/entities/vocabulary.entity';

describe('VocabularyService', () => {
  let service: VocabularyService;
  let mockRepository;

  beforeEach(async () => {

    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VocabularyService,
        {
          provide: getRepositoryToken(Vocabulary),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VocabularyService>(VocabularyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all vocabulary items', async () => {
    const items = [{ id: 1, term: 'Test', definition: 'A test term' }];
    mockRepository.find.mockResolvedValue(items);
    
    expect(await service.getAllVocabulary()).toEqual(items);
    expect(mockRepository.find).toHaveBeenCalled();
  });

});
