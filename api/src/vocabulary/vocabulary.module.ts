import { Global, Module } from '@nestjs/common';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { GroupedVocabList } from './entities/groupedVocabList.entity';
import { VocabularyGroupedVocabListLookupTable } from './entities/vocabularyGroupedVocabListLookupTable.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary,GroupedVocabList,VocabularyGroupedVocabListLookupTable])],
  controllers: [VocabularyController],
  providers: [VocabularyService],
  exports: [VocabularyService]
})
export class VocabularyModule {}
