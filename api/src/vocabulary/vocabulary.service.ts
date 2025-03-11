import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto/vocabulary.dto';
import { workerData } from 'worker_threads';
import { GroupedVocabList } from './entities/groupedVocabList.entity'
import { VocabularyGroupedVocabListLookupTable } from './entities/vocabularyGroupedVocabListLookupTable.entity';

@Injectable()
export class VocabularyService {
    constructor(
        @InjectRepository(Vocabulary)
        private readonly vocabularyRepository: Repository<Vocabulary>,
        @InjectRepository(GroupedVocabList)
        private readonly groupedvocablistRepository: Repository<GroupedVocabList>,
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


        const wordsInRepo: Vocabulary[] = await this.vocabularyRepository.find({where:{
            chinese: Equal(newWord.chinese),
            band: Equal(newWord.band)
        }
        });

        if(wordsInRepo) return;

        const createdWord: Partial<Vocabulary> = this.vocabularyRepository.create(newWord);

        await this.vocabularyRepository.save(createdWord);

        await this.addNewVocabularyToGroupedVocabList([createdWord.id], createdWord.band);
    }

    async updateWord(updateWordObject: UpdateVocabularyDto): Promise<void> {
        
        //word columns are not allowed to be null or empty

        const entityData: Partial<Vocabulary> = await this.vocabularyRepository.findOneBy({id:updateWordObject.id});

        if (!entityData) return null;

        await this.vocabularyRepository.save(entityData);

    }

    async getWordsByBand(band: string): Promise<Vocabulary[]> {

        const vocabulary: Vocabulary[] = await this.vocabularyRepository
        .find({where:{band: band}, 
             order: {
                    number: "ASC"
                    }});

        if(!vocabulary) {
            return vocabulary;
        }

        return [];

    }

    /**
     * Vocabulary GroupedVocabList as in a groupedvocablist name and its primary key
     */
    async createGroupedVocabList(newGroupedVocabListName: string): Promise<void> {
        const groupedvocablist: GroupedVocabList = await this.groupedvocablistRepository.findOne({where:{name: newGroupedVocabListName}});

        if(!groupedvocablist) {

            const newGroupedVocabList: GroupedVocabList =  this.groupedvocablistRepository.create({name: newGroupedVocabListName});
            await this.groupedvocablistRepository.save(newGroupedVocabList);

        }
    }


    async addNewVocabularyToGroupedVocabList(wordIds: number[], listName: string): Promise<void> {

        const words: Vocabulary[] = await this.vocabularyRepository.find({where:{
            id: In(wordIds)
        }});


        const listNameResult = await this.vocabularyRepository.query(
            `SELECT id, name FROM grouped_vocab_list WHERE name = $1`,
            [listName]
          );

        if(!words || !listNameResult) return;


        const insertedValues = await this.vocabularyRepository.createQueryBuilder()
            .insert()
            .into(VocabularyGroupedVocabListLookupTable)
            .values(
                wordIds.map(id =>({
                    vocabularyId: id,
                    groupedVocabListid: listNameResult.id
                }))
            )
            .execute();

        return;

    }

    
}
