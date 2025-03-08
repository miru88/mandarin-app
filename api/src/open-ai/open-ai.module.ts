import { Global, Module } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { OpenAiController } from './open-ai.controller';

@Global()
@Module({
  providers: [OpenAiService],
  controllers: [OpenAiController]
})
export class OpenAiModule {}
