import { useEffect, useState } from "react";
import "./EmployeeList.css";
import { employeeService } from "../../../Services/EmployeeService";
import { EmployeeModel } from "../../../Models/EmployeeModel";
import { EmployeeCard } from "../EmployeeCard/EmployeeCard";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";

export function EmployeeList() {

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        employeeService.getAllEmployees()
            .then(employees => setEmployees(employees))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="EmployeeList">

            {employees.length === 0 && <Spinner />}

            {employees.map(emp => <EmployeeCard key={emp.id} employee={emp} />)}

        </div>
    );
}
