import { Global, Module } from '@nestjs/common';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { VocabularyList } from './entities/vocabularyList.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary,VocabularyList])],
  controllers: [VocabularyController],
  providers: [VocabularyService],
  exports: [VocabularyService]
})
export class VocabularyModule {}
