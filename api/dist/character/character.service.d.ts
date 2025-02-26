import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
export declare class CharacterService {
    private readonly characterRepository;
    constructor(characterRepository: Repository<Character>);
    findAll(): Promise<Character[]>;
    findOne(characterId: number): Promise<Character>;
}
