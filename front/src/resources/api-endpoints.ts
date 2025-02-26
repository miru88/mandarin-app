
export class ApiEndpoints {

    private static readonly BASE_URL = 'http://localhost:3000';

    static readonly vocabulary = `${this.BASE_URL}/vocabulary`;
    static readonly character = `${this.BASE_URL}/character`

    static getAllVocabulary(): string {
        return this.vocabulary;
    }

    static getOneVocabularyWord(vocabularyId: number): string {
        return `${this.vocabulary}/${vocabularyId}`;
    }

    static getRandomVocabularyWord(): string {
        return `${this.vocabulary}/random`;
    }

    static getAllCharacters(): string {
        return this.character;
    }
}


// @Post()
// addWords(@Body() newVocabularyWord: CreateVocabularyDto) {
//     this.vocabularyService.addNewWord(newVocabularyWord);
// }

// @Patch()
// updateWord(@Body() vocabularyToUpdate: UpdateVocabularyDto) {
//     this.vocabularyService.updateWord(vocabularyToUpdate);
// }