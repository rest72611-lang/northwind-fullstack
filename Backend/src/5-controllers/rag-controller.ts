import express, { Request, Response, Router } from "express";
import { ragRetrieval } from "../4-services/rag-retrieval";

class RagController {

    // Create router - a part of express only for registering routes:
    public router: Router = express.Router();

    // Register routes: 
    public constructor() {
        this.router.post("/api/rag", this.retrieve);
    }

    // Register new user: 
    private async retrieve(request: Request, response: Response) {
        const question = request.body.question;
        const chunks = await ragRetrieval.retrieve(question);
        response.send(chunks);
    }

}

export const ragController = new RagController();
