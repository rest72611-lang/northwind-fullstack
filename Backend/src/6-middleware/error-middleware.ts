import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../3-models/errors";
import { StatusCode } from "../3-models/enums";
import { appConfig } from "../2-utils/app-config";

class ErrorMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

        // Print to console: 
        console.error(err);

        // Get HTTP status: 
        const status = err.status || StatusCode.InternalServerError;

        // Is server error: 
        const isServerError = status >= 500 && status <= 599;

        // Get error message: 
        const message = isServerError && appConfig.isProduction ? "Some error, please try again." : err.message;

        // log the error in database...

        // Return error to front: 
        response.status(status).send(message);
    }

    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        next(new RouteNotFoundError(request.originalUrl, request.method));
    }

}

export const errorMiddleware = new ErrorMiddleware();
