import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeModel } from "../Models/EmployeeModel";

// Init employees reducer: 
function initEmployee(_currentState: EmployeeModel[], action: PayloadAction<EmployeeModel[]>): EmployeeModel[] {
    const employeesToInit = action.payload;
    const newState = employeesToInit;
    return newState;
}

// Add employee reducer: 
function addEmployee(currentState: EmployeeModel[], action: PayloadAction<EmployeeModel>): EmployeeModel[] {
    const empToAdd = action.payload;
    const newState = [...currentState];
    newState.push(empToAdd);
    return newState;
}

// Update employee reducer: 
function updateEmployee(currentState: EmployeeModel[], action: PayloadAction<EmployeeModel>): EmployeeModel[] {
    const empToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(e => e.id === empToUpdate.id);
    if(index >= 0) newState[index] = empToUpdate;
    return newState;
}

// Delete employee reducer: 
function deleteEmployee(currentState: EmployeeModel[], action: PayloadAction<number>): EmployeeModel[] {
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(e => e.id === idToDelete);
    if(index >= 0) newState.splice(index, 1);
    return newState;
}

// Slice: 
export const employeeSlice = createSlice({
    name: "employee-slice",
    initialState: [] as EmployeeModel[],
    reducers: { initEmployee, addEmployee, updateEmployee, deleteEmployee }
});
