import express, { Request, Response, Router } from "express";
import { employeeService } from "../4-services/employee-service";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "../6-middleware/security-middleware";

class EmployeeController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/employees", this.getAllEmployees);
        this.router.get("/api/employees/:id", this.getOneEmployee);
        this.router.delete("/api/employees/:id", securityMiddleware.verifyAdmin, this.deleteEmployee);
        this.router.get("/api/employees/images/:imageName", this.getImage);
    }

    private async getAllEmployees(request: Request, response: Response) {
        const employees = await employeeService.getAllEmployees();
        response.json(employees);
    }

    private async getOneEmployee(request: Request, response: Response) {
        const id = +request.params.id;
        const employee = await employeeService.getOneEmployee(id);
        response.json(employee);
    }

    private async deleteEmployee(request: Request, response: Response) {
        const id = +request.params.id;
        await employeeService.deleteEmployee(id);
        response.sendStatus(StatusCode.NoContent);
    }

    private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName.toString();
        const filePath = fileSaver.getFilePath(imageName);
        response.sendFile(filePath);
    }

}

export const employeeController = new EmployeeController();
