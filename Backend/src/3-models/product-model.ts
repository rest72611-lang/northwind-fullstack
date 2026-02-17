import joi from "joi";
import { ValidationError } from "./errors";
import { UploadedFile } from "express-fileupload";

export class ProductModel {

    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public image: UploadedFile;
    public imageUrl: string;
    public imageName: string;

    public constructor(product: ProductModel) { // Copy-Constructor
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.image = product.image;
        this.imageUrl = product.imageUrl;
        this.imageName = product.imageName;
    }

    // joi schema - specify what is legal for each field:
    private static schema = joi.object({
        id: joi.number().optional().positive().integer(),
        name: joi.string().required().min(2).max(100),
        price: joi.number().required().min(0).max(1000),
        stock: joi.number().required().min(0).max(1000).integer(),
        image: joi.object().optional(),
        imageUrl: joi.string().optional().max(255),
        imageName: joi.string().optional().max(50)
    });

    // Validate this product against the schema:
    public validate(): void {
        const result = ProductModel.schema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}
