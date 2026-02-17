import axios from "axios";
import { EmployeeModel } from "../Models/EmployeeModel";
import { appConfig } from "../Utils/AppConfig";
import { employeeSlice } from "../Redux/EmployeeSlice";
import { store } from "../Redux/Store";

class EmployeeService {

    public async getAllEmployees(): Promise<EmployeeModel[]> {

        // If we have global state - return it:
        if (store.getState().employees.length > 0) {
            return store.getState().employees;
        }

        const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);
        const employees = response.data;

        // Update global state: 
        const action = employeeSlice.actions.initEmployee(employees);
        store.dispatch(action);

        return employees;
    }

    public async getOneEmployee(id: number): Promise<EmployeeModel> {

        // If we have global state - return it:
        const emp = store.getState().employees.find(e => e.id === id);
        if (emp) return emp;

        const response = await axios.get<EmployeeModel>(appConfig.employeesUrl + id);
        const dbEmployee = response.data;
        return dbEmployee;
    }

    // Add employee: 
    public async addEmployee(employee: EmployeeModel): Promise<void> {

        // Convert employee to FormData so it could send also the image: 
        const myFormData = new FormData();
        myFormData.append("firstName", employee.firstName!);
        myFormData.append("lastName", employee.lastName!);
        myFormData.append("title", employee.title!);
        myFormData.append("country", employee.country!);
        myFormData.append("city", employee.city!);
        myFormData.append("birthDate", employee.birthDate!);
        myFormData.append("image", employee.image!);

        // Send employee to backend:
        const response = await axios.post<EmployeeModel>(appConfig.employeesUrl, myFormData);

        // Extract added employee: 
        const dbEmployee = response.data;

        // Send dbEmployee to global state only if global state contains employees:
        if (store.getState().employees.length > 0) {
            const action = employeeSlice.actions.addEmployee(dbEmployee);
            store.dispatch(action);
        }
    }

    // Update employee: 
    public async updateEmployee(employee: EmployeeModel): Promise<void> {

        // Convert employee to FormData so it could send also the image: 
        const myFormData = new FormData();
        myFormData.append("firstName", employee.firstName!);
        myFormData.append("lastName", employee.lastName!);
        myFormData.append("title", employee.title!);
        myFormData.append("country", employee.country!);
        myFormData.append("city", employee.city!);
        myFormData.append("birthDate", employee.birthDate!);
        myFormData.append("image", employee.image!);

        // Send employee to backend:
        const response = await axios.put<EmployeeModel>(appConfig.employeesUrl + employee.id, myFormData);

        // Extract added employee: 
        const dbEmployee = response.data;

        // Send dbEmployee to global state:
        const action = employeeSlice.actions.updateEmployee(dbEmployee);
        store.dispatch(action);
    }

    public async deleteEmployee(id: number): Promise<void> {
        await axios.delete(appConfig.employeesUrl + id);

        // Delete from global state: 
        const action = employeeSlice.actions.deleteEmployee(id);
        store.dispatch(action);
    }
}

export const employeeService = new EmployeeService();
