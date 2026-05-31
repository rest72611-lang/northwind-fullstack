import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class RagService {

    public async ask(question: string): Promise<string> {
        const response = await axios.post<string>(appConfig.ragUrl, { question });
        return response.data;
    }

}

export const ragService = new RagService();
