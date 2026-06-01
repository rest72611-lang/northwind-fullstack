import axios from "axios";
import { Prompt } from "../Models/Prompt";
import { appConfig } from "../Utils/AppConfig";

class GptService {

    // Get GPT completion via backend:
    public async getCompletion(prompt: Prompt): Promise<string> {

        const body = {
            question: `${prompt.systemContent}\n\n${prompt.userContent}`.trim()
        };

        const response = await axios.post<string>(appConfig.ragUrl, body);

        return response.data;
    }

}

export const gptService = new GptService();
