import { OpenAIEmbedding } from "@llamaindex/openai";
import { Settings, storageContextFromDefaults, TextNode, VectorStoreIndex } from "llamaindex";
import { appConfig } from "../2-utils/app-config";
import path from "path";

class RagRetrieval {

    public async retrieve(question: string): Promise<string> {

        // RAG Settings:
        Settings.embedModel = new OpenAIEmbedding({ apiKey: appConfig.openaiApiKey });

        // Define the vector-db storage:
        const vectorDbFolder = path.join(__dirname, "..", "1-assets", "vector-db");
        const vectorDbStorage = await storageContextFromDefaults({ persistDir: vectorDbFolder });

        // Read the vector-db files:
        const vectorStore = await VectorStoreIndex.init({ storageContext: vectorDbStorage });

        // Retrieve relevant chunks from given question:
        const results = await vectorStore.asRetriever().retrieve(question);

        // Combine results into single string: 
        let chunks = "";
        for (let i = 0; i < results.length; i++) {
            let chunk = (results[i].node as TextNode).text;
            chunk = chunk.replace(/\n+/g, " ");
            chunks += `[chunk ${i + 1}]: ${chunk}\n\n`;
            console.log("score: " + results[i].score);
        }

        return chunks;
    }

}

export const ragRetrieval = new RagRetrieval();
