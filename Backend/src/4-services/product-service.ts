import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ProductModel } from "../3-models/product-model";
import { ResourceNotFoundError } from "../3-models/errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";

class ProductService {

    // Get all products: 
    public async getAllProducts(): Promise<ProductModel[]> {

        // Create sql:
        const sql = "select *, concat(?, imageName) as imageUrl from products";
        const values = [appConfig.imagesLocation];

        // Execute: 
        const products = await dal.execute(sql, values) as ProductModel[];

        // Return:
        return products;
    }

    // Get one product:
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Create sql: 
        const sql = "select *, concat(?, imageName) as imageUrl from products where id = ?";
        const values = [appConfig.imagesLocation, id];

        // Execute: 
        const products = await dal.execute(sql, values) as ProductModel[];

        // Extract the single product: 
        const product = products[0];

        // If no such product: 
        if (!product) throw new ResourceNotFoundError(id);

        // Return:
        return product;
    }

    // Add product: 
    public async addProduct(product: ProductModel): Promise<ProductModel> {

        // Validation: 
        product.validate();

        // Save the image:
        const imageName = product.image ? await fileSaver.add(product.image) : null!;
        
        // Create sql: 
        const sql = "insert into products(name, price, stock, imageName) values(?, ?, ?, ?)";
        const values = [product.name, product.price, product.stock, imageName];

        // Execute: 
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;

        // Get the added product from the database: 
        const dbProduct = await this.getOneProduct(info.insertId!);

        // Return:
        return dbProduct;
    }

    // Update product: 
    public async updateProduct(product: ProductModel): Promise<ProductModel> {

        // Validation: 
        product.validate();

        // Update image: 
        const oldImageName = await this.getImageName(product.id);
        const newImageName = product.image ? await fileSaver.update(oldImageName!, product.image) : oldImageName;

        // Create sql: 
        const sql = "update products set name = ?, price = ?, stock = ?, imageName = ? where id = ?";
        const values = [product.name, product.price, product.stock, newImageName!, product.id];

        // Execute: 
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;

        // If no such product:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(product.id!);

        // Get the updated product from the database: 
        const dbProduct = await this.getOneProduct(product.id!);

        // Return:
        return dbProduct;
    }

    // Delete product: 
    public async deleteProduct(id: number): Promise<void> {

        // Get old image:
        const oldImageName = await this.getImageName(id);
        
        // Create sql: 
        const sql = "delete from products where id = ?";
        const values = [id];
        
        // Execute: 
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        
        // If no such product:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
        
        // Delete image: 
        await fileSaver.delete(oldImageName!);
    }

    // Get products by price range: 
    public async getProductsByPriceRange(min: number, max: number): Promise<ProductModel[]> {

        // Create sql:
        const sql = "select * from products where price between ? and ? order by price";
        const values = [min, max];

        // Execute: 
        const products = await dal.execute(sql, values) as ProductModel[];

        // Return:
        return products;
    }

    // Get image name from db:
    private async getImageName(id: number): Promise<string | null> {
        const sql = "select imageName from products where id = ?";
        const values = [id];
        const products = await dal.execute(sql, values) as ProductModel[];
        const product = products[0];
        if(!product) return null;
        return product.imageName;
    }
}

export const productService = new ProductService();
