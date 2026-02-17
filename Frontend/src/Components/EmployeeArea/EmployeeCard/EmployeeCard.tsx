import { useNavigate } from "react-router-dom";
import { EmployeeModel } from "../../../Models/EmployeeModel";
import "./EmployeeCard.css";

type EmployeeCardProps = {
	employee: EmployeeModel;
};

export function EmployeeCard(props: EmployeeCardProps) {

    const navigate = useNavigate();
    
    function details() {
        navigate("/employees/details/" + props.employee.id);
    }

    return (
        <div className="EmployeeCard" onClick={details}>

			<div>
                <span>First name: {props.employee.firstName}</span>
                <span>Last name: {props.employee.lastName}</span>
            </div>

            <div>
                <img src={props.employee.imageUrl} />
            </div>

        </div>
    );
}
