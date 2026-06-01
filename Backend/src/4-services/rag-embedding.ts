import { OpenAIEmbedding } from "@llamaindex/openai";
import { Settings, storageContextFromDefaults, VectorStoreIndex } from "llamaindex";
import { appConfig } from "../2-utils/app-config";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import path from "path";

class RagEmbedding {

    public constructor() {
        this.embed();
    }

    public async embed(): Promise<void> {
        try {

            if (!appConfig.openaiApiKey) {
                console.warn("Skipping RAG embedding: OPENAI_API_KEY is not configured on the backend.");
                return;
            }

            // RAG Settings:
            Settings.embedModel = new OpenAIEmbedding({ apiKey: appConfig.openaiApiKey });
            Settings.chunkSize = 300; // Default = 1024 tokens
            Settings.chunkOverlap = 40; // Default = undefined

            // Read organization documents: 
            const reader = new SimpleDirectoryReader();
            const docsFolder = path.join(__dirname, "..", "1-assets", "docs");
            const documents = await reader.loadData({ directoryPath: docsFolder });

            // Define the vector-db storage:
            const vectorDbFolder = path.join(__dirname, "..", "1-assets", "vector-db");
            const vectorDbStorage = await storageContextFromDefaults({ persistDir: vectorDbFolder });

            // Create the vector-db files: 
            const vectorStore = await VectorStoreIndex.fromDocuments(documents, { storageContext: vectorDbStorage });

            // Display total chunks created:
            const chunks = vectorStore.indexStruct.nodesDict;
            console.log("Total chunks created: " + Object.keys(chunks).length);
        }
        catch (err: any) {
            console.error(err);
        }
    }

}

export const ragEmbedding = new RagEmbedding();
