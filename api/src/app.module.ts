import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { StoryModule } from './story/story.module';
import { VocabularyStatisticsModule } from './vocabulary_statistics/vocabulary_statistics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from './character/character.module';


@Module({
  imports: [
    VocabularyModule, 
    StoryModule, 
    VocabularyStatisticsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'chinese',
      autoLoadEntities: true,
      synchronize: true
    }),
    CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
