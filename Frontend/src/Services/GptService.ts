import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import { Prompt } from "../Models/Prompt";
import { appConfig } from "../Utils/AppConfig";

class GptService {

    // OpenAI configuration:
    private openai = new OpenAI({ 
        apiKey: appConfig.chatGptApiKey,
        dangerouslyAllowBrowser: true // Only if we really want to do it in the frontend.
    });

    // Get GPT completion: 
    public async getCompletion(prompt: Prompt): Promise<string> {

        // Data to send: 
        const body: ChatCompletionCreateParamsNonStreaming = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: prompt.systemContent },
                { role: "user", content: prompt.userContent }
            ]
        };

        // Send request: 
        const response = await this.openai.chat.completions.create(body)

        // Return completion: 
        const completion = response.choices[0].message.content!;
        return completion;
    }

    // // Create a local axios object detached from the general axios so it won't be intercepted:
    // private gptAxios = axios.create();

    // // Get GPT completion: 
    // public async getCompletion(prompt: Prompt): Promise<string> {

    //     // Data to send: 
    //     const body = {
    //         model: "gpt-4o-mini",
    //         messages: [
    //             { role: "system", content: prompt.systemContent },
    //             { role: "user", content: prompt.userContent }
    //         ]
    //     };

    //     // API Key: 
    //     const options: AxiosRequestConfig = {
    //         headers: { Authorization: "Bearer " + appConfig.chatGptApiKey }
    //     };

    //     // Request: 
    //     const response = await this.gptAxios.post(appConfig.chatGptUrl, body, options);

    //     // Extract and return completion: 
    //     const completion = response.data.choices[0].message.content;
    //     return completion;

    // }

}

export const gptService = new GptService();
