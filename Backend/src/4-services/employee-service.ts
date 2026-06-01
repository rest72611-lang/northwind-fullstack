import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { appConfig } from "../2-utils/app-config";
import { ResourceNotFoundError } from "../3-models/errors";

class EmployeeService {

    public async getAllEmployees(): Promise<object[]> {
        const sql = `
            select e.*,
                   c.name as country,
                   ci.name as city,
                   concat(?, e.imageName) as imageUrl
            from employees as e
            left join countries as c on e.countryId = c.id
            left join cities as ci on e.cityId = ci.id
        `;
        const values = [appConfig.employeeImagesLocation];
        const employees = await dal.execute(sql, values) as object[];
        return employees;
    }

    public async getOneEmployee(id: number): Promise<object> {
        const sql = `
            select e.*,
                   c.name as country,
                   ci.name as city,
                   concat(?, e.imageName) as imageUrl
            from employees as e
            left join countries as c on e.countryId = c.id
            left join cities as ci on e.cityId = ci.id
            where e.id = ?
        `;
        const values = [appConfig.employeeImagesLocation, id];
        const employees = await dal.execute(sql, values) as object[];
        const employee = employees[0];
        if (!employee) throw new ResourceNotFoundError(id);
        return employee;
    }

    public async deleteEmployee(id: number): Promise<void> {
        const sql = "delete from employees where id = ?";
        const values = [id];
        const info = await dal.execute(sql, values) as OkPacketParams;
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    }

}

export const employeeService = new EmployeeService();
