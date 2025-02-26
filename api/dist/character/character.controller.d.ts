import { CharacterService } from './character.service';
export declare class CharacterController {
    private readonly characterService;
    constructor(characterService: CharacterService);
    findAll(): Promise<import("./entities/character.entity").Character[]>;
    findOne(id: number): Promise<import("./entities/character.entity").Character>;
}
