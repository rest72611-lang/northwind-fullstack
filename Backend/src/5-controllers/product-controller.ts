import express, { Request, Response, Router } from "express";
import { productService } from "../4-services/product-service";
import { ProductModel } from "../3-models/product-model";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "../6-middleware/security-middleware";

class ProductController {

    // Create router - a part of express only for registering routes:
    public router: Router = express.Router();

    // Register routes: 
    public constructor() {
        this.router.get("/api/products", this.getAllProducts);
        this.router.get("/api/products/:id", this.getOneProduct);
        this.router.post("/api/products", securityMiddleware.verifyToken, this.addProduct);
        this.router.put("/api/products/:id", securityMiddleware.verifyToken, this.updateProduct);
        this.router.delete("/api/products/:id", securityMiddleware.verifyAdmin, this.deleteProduct);
        this.router.get("/api/products-by-price/:min/:max", this.getProductsByPriceRange);
        this.router.get("/api/products/images/:imageName", this.getImage);
    }

    // Get all products: 
    private async getAllProducts(request: Request, response: Response) {
        console.log("User requesting all products...");
        const products = await productService.getAllProducts();
        response.json(products);
    }

    // Get one product by id:
    private async getOneProduct(request: Request, response: Response) {
        const id = +request.params.id;
        const product = await productService.getOneProduct(id);
        response.json(product);
    }

    // Add product:
    private async addProduct(request: Request, response: Response) {
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const dbProduct = await productService.addProduct(product);
        response.status(StatusCode.Created).json(dbProduct);
    }

    // Update product: 
    private async updateProduct(request: Request, response: Response) {
        request.body.image = request.files?.image;
        request.body.id = +request.params.id;
        const product = new ProductModel(request.body);
        const dbProduct = await productService.updateProduct(product);
        response.json(dbProduct);
    }

    // Delete product: 
    private async deleteProduct(request: Request, response: Response) {
        const id = +request.params.id;
        await productService.deleteProduct(id);
        response.sendStatus(StatusCode.NoContent); // response.status(StatusCode.NoContent).send();
    }

    // Get products by price range: 
    private async getProductsByPriceRange(request: Request, response: Response) {
        const min = +request.params.min;
        const max = +request.params.max;
        const products = await productService.getProductsByPriceRange(min, max);
        response.json(products);
    }

    // Get image by imageName: 
    private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName.toString();
        const filePath = fileSaver.getFilePath(imageName);
        response.sendFile(filePath);
    }

}

export const productController = new ProductController();
