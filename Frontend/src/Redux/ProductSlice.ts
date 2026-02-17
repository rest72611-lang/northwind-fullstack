import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

// Init products reducer: 
function initProducts(_currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {
    const productsToInit = action.payload; // Get products to init.
    const newState = productsToInit; // New state is the products to init.
    return newState; // Return the new state.
}

// Add product reducer: 
function addProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const productToAdd = action.payload; // Get the product to add.
    const newState = [...currentState]; // Duplicating currentState.
    newState.push(productToAdd); // Add the product.
    return newState; // Return the new state.
}

// Update product reducer: 
function updateProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const productToUpdate = action.payload; // Get the product to update.
    const newState = [...currentState]; // Duplicating currentState.
    const index = newState.findIndex(p => p.id === productToUpdate.id); // Find index to update (-1 if not found)
    if (index >= 0) {
        newState[index] = productToUpdate; // Update.
    }
    return newState; // Return the new state.
}

// Delete product reducer: 
function deleteProduct(currentState: ProductModel[], action: PayloadAction<number>): ProductModel[] {
    const idToDelete = action.payload; // Get the product id to delete.
    const newState = [...currentState]; // Duplicating currentState.
    const index = newState.findIndex(p => p.id === idToDelete); // Find index to delete (-1 if not found).
    if (index >= 0) {
        newState.splice(index, 1); // Delete from index one item.
    }
    return newState; // Return the new state.
}

// Product slice: 
export const productSlice = createSlice({
    name: "product-slice", // Unique name for this slice.
    initialState: [] as ProductModel[], // Initial data.
    reducers: { initProducts, addProduct, updateProduct, deleteProduct } // Which functions handling this slice.
});
