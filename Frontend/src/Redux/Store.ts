import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { productSlice } from "./ProductSlice";
import { employeeSlice } from "./EmployeeSlice";
import { userSlice } from "./UserSlice";

// Application store - the global object managing all: 
export const store = configureStore<AppState>({
    reducer: {
        user: userSlice.reducer, // Connect AppState user to userSlice reducers.
        products: productSlice.reducer, // Connect AppState products to productSlice reducers.
        employees: employeeSlice.reducer // Connect AppState employees to employeeSlice reducers.
    }
});

