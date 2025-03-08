import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from "openai";


@Injectable()
export class OpenAiService {
    private readonly openAi: OpenAI;

    constructor(private readonly configService: ConfigService){
        const apiKey: string = this.configService.get<string>('OPENAI_API_KEY');
        this.openAi = new OpenAI({apiKey: apiKey});
    }

    //chat
    async createChat(content: string): Promise<string> {

        try {
            const completion = await this.openAi.chat.completions.create({
                model: "gpt-4o-mini",
                store: true,
                messages: [
                    {"role": "user", "content": content},
                ],
            });
            
            return completion.choices[0].message.content || "";
        } catch (error) {
            console.error("Error creating chat completion:", error);
            throw error;
        }
    }


    //image



}


