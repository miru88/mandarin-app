import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto/vocabulary.dto';
import { workerData } from 'worker_threads';

@Injectable()
export class VocabularyService {
    constructor(
        @InjectRepository(Vocabulary)
        private readonly vocabularyRepository: Repository<Vocabulary>,
      ) {}



    async getAllVocabulary(): Promise<Vocabulary[]>{

        const allVocabulary: Vocabulary[] = await this.vocabularyRepository.find({order: { band: 'ASC', number: 'ASC'  }});

        return allVocabulary === null ? [] : allVocabulary;
    }

    async getOneVocabularyWord(vocabId: number): Promise<Vocabulary> {
        return await this.vocabularyRepository.findOne({ where: { id: vocabId } });
    }

    async getRandomVocabularyWord(): Promise<Vocabulary> {

        const minMax = await this.vocabularyRepository
        .createQueryBuilder()
        .select('MIN(id)', 'min')
        .addSelect('MAX(id)','max')
        .getRawOne();

        if (!minMax) return null;

        const randomId = Math.floor(Math.random() * (minMax.max - minMax.min + 1)) + minMax.min;

        return this.vocabularyRepository.findOne({ where: { id: randomId } });
    }

    async addNewWord(newWord: Partial<Vocabulary>): Promise<void> {

        const createdWord: Partial<Vocabulary> = this.vocabularyRepository.create(newWord);
        createdWord.band = 'CUSTOM';

        await this.vocabularyRepository.save(createdWord);
    }

    async updateWord(updateWordObject: UpdateVocabularyDto): Promise<void> {
        
        //word columns are not allowed to be null or empty

        const entityData: Partial<Vocabulary> = await this.vocabularyRepository.findOneBy({id:updateWordObject.id});

        if (!entityData) return null;

        await this.vocabularyRepository.save(entityData);

    }
}
