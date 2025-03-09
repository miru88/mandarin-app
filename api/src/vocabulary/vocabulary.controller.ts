import { Controller, Get, Post, Delete, Patch ,Param, Body, UseGuards } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto/vocabulary.dto';
import { Roles, RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';

@Controller('vocabulary')
export class VocabularyController {

    constructor(
        private readonly vocabularyService: VocabularyService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get()
    getAllVocabulary() {
        return this.vocabularyService.getAllVocabulary();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('word/:id')
    getOneVocabularyWord(@Param('id') vocabId: number) {
        return this.vocabularyService.getOneVocabularyWord(vocabId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('random')
    getRandomVocabularyWord() {
        return this.vocabularyService.getRandomVocabularyWord();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Post()
    addWords(@Body() newVocabularyWord: CreateVocabularyDto) {
        this.vocabularyService.addNewWord(newVocabularyWord);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Patch()
    updateWord(@Body() vocabularyToUpdate: UpdateVocabularyDto) {
        this.vocabularyService.updateWord(vocabularyToUpdate);
    }

    //what is the difference between a list and a band?
        //band is an offial HSK standard
        //list may or may not have vocabulary from HSK
            //is indicated by a string in the vocabulary table other than 1 - 9


    //have to think about how to implement lists
        //what to do if a new list hase a word that already exists?
        //do we just have the word in the vocabulary table and use the band column?
        //for a one person application, sure duplicates are fine i think
        
        //possibly have a list that we want to add with the list name
        //add the ones that dont exist,keep the vocabulary table unique,
        //this would require to check if there arent already and duplicates
        //drop the band column and depend on the vocabulary list table  

    //create a vocabulary list



    //get vocabulary list

    //update vocabulary list

}

// #### Public Endpoints
// - `GET /vocabulary` - Get a list of words (filter by difficulty, frequency, HSK level, etc.)
// - `GET /vocabulary/:id` - Get details about a specific word
// - `GET /vocabulary/random` - Get a random word
// - `POST /vocabulary` - Add a new word to the system (if necessary)

// #### User-Specific Endpoints
// - `GET /users/:userId/vocabulary` - Get a user's saved words
// - `POST /users/:userId/vocabulary` - Add a word to a user's saved list
// - `DELETE /users/:userId/vocabulary/:wordId` - Remove a word from a user's list


