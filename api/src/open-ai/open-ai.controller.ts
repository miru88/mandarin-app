import { Body, Controller, Post } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
    constructor(private readonly openAiService: OpenAiService) {}


    
    @Post('create/chat')
    async createChat(@Body() body: any) {//create the DTO here
        return await this.openAiService.createChat(body.message);
    }

    @Post('create/story')
    async createStory(@Body() body: any) {//create the DTO here
        return await this.openAiService.createStory(body.conent, body.vocabulary);
    }

}
