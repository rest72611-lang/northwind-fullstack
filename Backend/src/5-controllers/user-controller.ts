import express, { Request, Response, Router } from "express";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";
import { securityMiddleware } from "../6-middleware/security-middleware";

class UserController {

    // Create router - a part of express only for registering routes:
    public router: Router = express.Router();

    // Register routes: 
    public constructor() {
        this.router.post("/api/register", this.register);
        this.router.post("/api/login", this.login);
        this.router.get("/api/users/:id", securityMiddleware.verifyToken, securityMiddleware.verifyMe, this.getOneUser);
    }

    // Register new user: 
    private async register(request: Request, response: Response) {
        const user = new UserModel(request.body);
        const token = await userService.register(user);
        response.status(StatusCode.Created).json(token);
    }

    // Login existing new user: 
    private async login(request: Request, response: Response) {
        const credentials = new CredentialsModel(request.body);
        const token = await userService.login(credentials);
        response.json(token);
    }

    // Get one user: 
    private async getOneUser(request: Request, response: Response) {
        const id = +request.params.id;
        const user = await userService.getOneUser(id);
        response.json(user);
    }

}

export const userController = new UserController();
