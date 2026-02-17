import { appConfig } from "./2-utils/app-config";
import { productController } from "./5-controllers/product-controller";
import { errorMiddleware } from "./6-middleware/error-middleware";
import expressFileUpload from "express-fileupload"
import { fileSaver } from "uploaded-file-saver";
import path from "path";
import { userController } from "./5-controllers/user-controller";
import cors from "cors";
import { cyber } from "./2-utils/cyber";
import { securityMiddleware } from "./6-middleware/security-middleware";

import expressRateLimit from "express-rate-limit"
import express, { Request } from "express";

class App {

    public start(): void {

        // Create express server:
        const server = express();

        // Prevent DoS attack: 
        server.use(expressRateLimit({
            windowMs: 1000, // Time window.
            limit: 5, // How many requests are permitted in this time window.
            skip: (request: Request) => request.path.startsWith("/api/products/images/") // When to skip the rate-limit.
        }));

        // Tell express that request.body is a JSON format: 
        server.use(express.json());

        // Enable CORS for any client: 
        server.use(cors());

        // Image config:
        server.use(expressFileUpload());
        const imageLocation = path.join(__dirname, "1-assets", "images");
        fileSaver.config(imageLocation); // Tell this library where to save uploaded images.

        // Prevent XSS attack: 
        server.use(securityMiddleware.preventXss);

        // Connect controllers: 
        server.use(productController.router);
        server.use(userController.router);

        // Register error middleware:
        server.use(errorMiddleware.routeNotFound);
        server.use(errorMiddleware.catchAll);

        // Listen: 
        server.listen(appConfig.port, () => console.log("Listening..."));
    }

}

const app = new App();
app.start();
