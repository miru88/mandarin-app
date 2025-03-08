"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vocabulary_entity_1 = require("./entities/vocabulary.entity");
let VocabularyService = class VocabularyService {
    constructor(vocabularyRepository) {
        this.vocabularyRepository = vocabularyRepository;
    }
    async getAllVocabulary() {
        const allVocabulary = await this.vocabularyRepository.find({ order: { band: 'ASC', number: 'ASC' } });
        return allVocabulary === null ? [] : allVocabulary;
    }
    async getOneVocabularyWord(vocabId) {
        return await this.vocabularyRepository.findOne({ where: { id: vocabId } });
    }
    async getRandomVocabularyWord() {
        const minMax = await this.vocabularyRepository
            .createQueryBuilder()
            .select('MIN(id)', 'min')
            .addSelect('MAX(id)', 'max')
            .getRawOne();
        if (!minMax)
            return null;
        const randomId = Math.floor(Math.random() * (minMax.max - minMax.min + 1)) + minMax.min;
        return this.vocabularyRepository.findOne({ where: { id: randomId } });
    }
    async addNewWord(newWord) {
        const createdWord = this.vocabularyRepository.create(newWord);
        createdWord.band = 'CUSTOM';
        await this.vocabularyRepository.save(createdWord);
    }
    async updateWord(updateWordObject) {
        const entityData = await this.vocabularyRepository.findOneBy({ id: updateWordObject.id });
        if (!entityData)
            return null;
        await this.vocabularyRepository.save(entityData);
    }
    async getWordsByBand(band) {
        const vocabulary = await this.vocabularyRepository
            .find({ where: { band: band },
            order: {
                number: "ASC"
            } });
        if (!vocabulary) {
            return vocabulary;
        }
        return [];
    }
};
exports.VocabularyService = VocabularyService;
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vocabulary_entity_1.Vocabulary)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VocabularyService);
//# sourceMappingURL=vocabulary.service.js.map