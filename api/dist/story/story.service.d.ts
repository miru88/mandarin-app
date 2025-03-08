import { Story } from './story.entity';
import { Repository } from 'typeorm';
export declare class StoryService {
    readonly storyRepository: Repository<Story>;
    constructor(storyRepository: Repository<Story>);
    getStoryById(storyId: number): Promise<Story | null>;
    getAllStories(): Promise<Story[]>;
    getStoriesByBand(band: string): Promise<Story[]>;
}
