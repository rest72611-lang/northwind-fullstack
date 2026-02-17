import axios from "axios";
import { ProductModel } from "../Models/ProductModel";
import { productSlice } from "../Redux/ProductSlice";
import { store } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";
import { Prompt } from "../Models/Prompt";
import { gptService } from "./GptService";

class ProductService {

    // Get all products from backend: 
    public async getAllProducts(): Promise<ProductModel[]> {

        // If we have products in global state - return those products: 
        if (store.getState().products.length > 0) {
            return store.getState().products;
        }

        // Get products from backend:
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl);

        // Extract products:
        const products = response.data;

        // // Save all products in global state: 
        // const action: PayloadAction<ProductModel[]> = {
        //     type: "product-slice/initProducts", // Which reducer to call "slice-name/reducerFunction"
        //     payload: products // This is the payload to send in the action.
        // };

        // Same - create action: 
        const action = productSlice.actions.initProducts(products);

        // Send action to the correct reducer: 
        store.dispatch(action);

        // Return products: 
        return products;
    }

    // Get one product from backend: 
    public async getOneProduct(id: number): Promise<ProductModel> {

        // If product already exist in global state - return it:
        const product = store.getState().products.find(p => p.id === id);
        if (product) {
            return product;
        }

        // Get product from backend: 
        const response = await axios.get<ProductModel>(appConfig.productsUrl + id);

        // Extract product: 
        const dbProduct = response.data;

        // Return product: 
        return dbProduct;
    }

    // Add product: 
    public async addProduct(product: ProductModel): Promise<void> {

        // Convert product to FormData so it could send also the image: 
        const myFormData = new FormData();
        myFormData.append("name", product.name!);
        myFormData.append("price", product.price?.toString()!);
        myFormData.append("stock", product.stock?.toString()!);
        myFormData.append("image", product.image!);

        // Send product to backend:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, myFormData);

        // Extract added product: 
        const dbProduct = response.data;

        // Send dbProduct to global state only if global state contains products:
        if (store.getState().products.length > 0) {
            const action = productSlice.actions.addProduct(dbProduct); // { type: "product-slice/addProduct", payload: dbProduct }
            store.dispatch(action);
        }
    }

    // Update product: 
    public async updateProduct(product: ProductModel): Promise<void> {

        // Convert product to FormData so it could send also the image: 
        const myFormData = new FormData();
        myFormData.append("name", product.name!);
        myFormData.append("price", product.price?.toString()!);
        myFormData.append("stock", product.stock?.toString()!);
        myFormData.append("image", product.image!);

        // Send product to backend: 
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, myFormData);

        // Extract updated product: 
        const dbProduct = response.data;

        // Update product in global state:
        const action = productSlice.actions.updateProduct(dbProduct); // { type: "product-slice/updateProduct", payload: dbProduct }
        store.dispatch(action);
    }

    // Delete product from backend: 
    public async deleteProduct(id: number): Promise<void> {

        // Delete product from backend:
        await axios.delete(appConfig.productsUrl + id);

        // Delete this product from global state: 
        const action = productSlice.actions.deleteProduct(id); // { type: "product-slice/deleteProduct", payload: id }
        store.dispatch(action);
    }

    // Get top 3 products: 
    public async getTop3(): Promise<ProductModel[]> {

        // const token = localStorage.getItem("token");
        // const options: AxiosRequestConfig = {
        //     headers: {
        //         Authorization: "Bearer " + token
        //     }
        // };

        // Get top 3 products: 
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl + "top-three" /*, options */);

        // Extract: 
        const products = response.data;

        // Return:
        return products;
    }

    // Get out-of-stock products: 
    public async getOutOfStock(): Promise<ProductModel[]> {

        // Get out-of-stock products: 
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl + "out-of-stock");

        // Extract: 
        const products = response.data;

        // Return:
        return products;
    }

    public async getAiReview(productName: string): Promise<string> {
        const prompt = new Prompt();

        // GPT Personality:
        prompt.systemContent = "You are an expert in 'Northwind Traders' products.";

        // Our command: 
        prompt.userContent = `
            Write about 200 words review for the 'Northwind Traders' product "${productName}".
            Return back an HTML divided into paragraphs containing the review.
            Emphasize important words with <strong> tags.
        `;
        
        // Get review:
        let review = await gptService.getCompletion(prompt);

        // Remove starting ```html and ending ``` if exist:
        review = review.replace("```html", "").replace("```", "").trim();
        return review;
    }
}

export const productService = new ProductService();
