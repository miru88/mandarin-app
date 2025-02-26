import { Repository } from 'typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { UpdateVocabularyDto } from './dto/vocabulary.dto';
export declare class VocabularyService {
    private readonly vocabularyRepository;
    constructor(vocabularyRepository: Repository<Vocabulary>);
    getAllVocabulary(): Promise<Vocabulary[]>;
    getOneVocabularyWord(vocabId: number): Promise<Vocabulary>;
    getRandomVocabularyWord(): Promise<Vocabulary>;
    addNewWord(newWord: Partial<Vocabulary>): Promise<void>;
    updateWord(updateWordObject: UpdateVocabularyDto): Promise<void>;
}
