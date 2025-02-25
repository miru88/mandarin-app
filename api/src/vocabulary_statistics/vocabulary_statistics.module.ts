import { Global, Module } from '@nestjs/common';
import { VocabularyStatisticsController } from './vocabulary_statistics.controller';
import { VocabularyStatisticsService } from './vocabulary_statistics.service';

@Global()
@Module({
  controllers: [VocabularyStatisticsController],
  providers: [VocabularyStatisticsService],
  exports: [VocabularyStatisticsService]
})
export class VocabularyStatisticsModule {}
