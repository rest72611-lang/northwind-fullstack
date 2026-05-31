import express, { NextFunction, Request, Response, Router } from "express";
import { ragRetrieval } from "../4-services/rag-retrieval";
import { ValidationError } from "../3-models/errors";

class RagController {

    // Create router - a part of express only for registering routes:
    public router: Router = express.Router();

    // Register routes: 
    public constructor() {
        this.router.post("/api/rag", this.retrieve);
    }

    // Register new user: 
    private async retrieve(request: Request, response: Response, next: NextFunction) {
        try {
            const question = request.body.question;
            if (!question) throw new ValidationError("Question is required.");

            const chunks = await ragRetrieval.retrieve(question);
            response.send(chunks);
        }
        catch (err: any) {
            next(err);
        }
    }

}

export const ragController = new RagController();
