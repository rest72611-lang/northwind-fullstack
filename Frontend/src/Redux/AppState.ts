import { EmployeeModel } from "../Models/EmployeeModel";
import { ProductModel } from "../Models/ProductModel";
import { UserModel } from "../Models/UserModel";

// Type declaring which data resides in the global state: 
export type AppState = {
    user: UserModel;
    products: ProductModel[];
    employees: EmployeeModel[];
};

