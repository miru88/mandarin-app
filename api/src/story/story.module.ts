import { Global, Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Story])],
    controllers: [StoryController],
    exports: [TypeOrmModule.forFeature([Story]),StoryService],
    providers: [StoryService]
})
export class StoryModule {
  constructor(private readonly storyService: StoryService) {}
}
