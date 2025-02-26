import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto/vocabulary.dto';
export declare class VocabularyController {
    private readonly vocabularyService;
    constructor(vocabularyService: VocabularyService);
    getAllVocabulary(): Promise<import("./entities/vocabulary.entity").Vocabulary[]>;
    getOneVocabularyWord(vocabId: number): Promise<import("./entities/vocabulary.entity").Vocabulary>;
    getRandomVocabularyWord(): Promise<import("./entities/vocabulary.entity").Vocabulary>;
    addWords(newVocabularyWord: CreateVocabularyDto): void;
    updateWord(vocabularyToUpdate: UpdateVocabularyDto): void;
}
