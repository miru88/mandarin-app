import { Global, Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Global()
@Module({
  controllers: [StoryController],
  providers: [StoryService],
  exports: [StoryService]
})
export class StoryModule {}
