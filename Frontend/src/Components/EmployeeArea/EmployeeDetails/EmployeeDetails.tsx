import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../Models/EmployeeModel";
import { employeeService } from "../../../Services/EmployeeService";
import "./EmployeeDetails.css";
import { notify } from "../../../Utils/Notify";

export function EmployeeDetails() {

    const [employee, setEmployee] = useState<EmployeeModel>();
    const params = useParams();
    const navigate = useNavigate();
    const id = Number(params.empId);

    useEffect(() => {
        employeeService.getOneEmployee(id)
            .then(emp => setEmployee(emp))
            .catch(err => notify.error(err));
    }, []);

    async function deleteMe() {
        try {
            const sure = confirm("Are you sure?");
            if (!sure) return;
            await employeeService.deleteEmployee(id);
            notify.success("Employee has been deleted.");
            navigate("/employees");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EmployeeDetails">

            <h4>{employee?.title} {employee?.firstName} {employee?.lastName}</h4>
            <h4>Location: {employee?.city}, {employee?.country}</h4>
            <h5>Birth Date: {employee?.birthDate}</h5>
            <img src={employee?.imageUrl} />

            <br /><br />

            <button onClick={deleteMe}>Delete</button>

        </div>
    );
}
