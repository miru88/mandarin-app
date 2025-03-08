import { Injectable } from '@nestjs/common';
import { Story } from './story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoryService {
    constructor(
        @InjectRepository(Story)
        readonly storyRepository: Repository<Story> ) {}

    async getStoryById(storyId: number): Promise<Story | null> {
        const story: Story = await this.storyRepository.findOne({where:{id:storyId}});

        if(!story) {
            return null;
        }
        return story;
    }

    async getAllStories(): Promise<Story[]> {
        const stories: Story[] = await this.storyRepository.find();

        if(!stories) {
            return [];
        }
        return stories;
    }

    async getStoriesByBand(band: string): Promise<Story[]> {

        const stories: Story[] = await this.storyRepository.find({where:{band: band}});

        if(!stories) {
            return [];
        }
        return stories;        
    }


}
