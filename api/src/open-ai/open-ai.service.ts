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

    //story
    async createStory(content: string, vocabulary:string[]) {

        try {
            const completion = await this.openAi.chat.completions.create({
                model: "gpt-4o-mini",
                store: true,
                messages: [
                    {
                        "role": "developer",
                        "content": [
                          {
                            "type": "text",
                            "text": `
                              You are a helpful assistant helping to create stort stories to practice Mandarin Chinese.
                              The story itself will be in Simplified Chinese Characters first and then the translation will be provided afterwards.
                              Provide the story and its translation in a json object with a story property and a translation property.
                              These are the words that are to be focused on for practice: ${vocabulary}
                            `
                          }
                        ]
                      },
                    {"role": "user", "content": content},
                ],
            });
            
            return completion.choices[0].message.content || "";
        } catch (error) {
            console.error("Error creating chat completion:", error);
            throw error;
        }  
    }

    // //upload files
    // async uploadFile() {

    // }

    //
    //image



}


