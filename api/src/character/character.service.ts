import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {

  constructor(
              @InjectRepository(Character)
              private readonly characterRepository: Repository<Character>
  ) {}



  // create(createCharacterDto: CreateCharacterDto) {
  //   return 'This action adds a new character';
  // }

  async findAll(): Promise<Character[]> {
    const chineseCharacters: Character[] =  await this.characterRepository.find({order:{chinese: 'ASC'}})

    if( !chineseCharacters) return [];
    
    return chineseCharacters;

  }

  async findOne(characterId: number) {
    
    const chineseCharacter: Character = await this.characterRepository.findOneBy({id:characterId});

    if(!chineseCharacter) return null;

    return chineseCharacter;

  }

  // update(id: number, updateCharacterDto: UpdateCharacterDto) {
  //   return `This action updates a #${id} character`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} character`;
  // }

  // compileCharacterTableFromVocabulary() {

  // }


  //WE POPULATED THE CHARACTER TABLE WITH THE BELOW SCRIPT

//   INSERT INTO character (character)
// SELECT DISTINCT regexp_split_to_table(
// 	TRIM(
// 	regexp_replace(
//     regexp_replace(chinese, '（.*', '', 'g'),'｜.*', '', 'g')), -- Remove everything from first ( or | onwards
//     ''
// ) AS chinese
// FROM vocabulary
// ON CONFLICT DO NOTHING;
}
