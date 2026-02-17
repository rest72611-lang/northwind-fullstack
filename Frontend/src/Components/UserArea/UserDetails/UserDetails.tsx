import { useParams } from "react-router-dom";
import "./UserDetails.css";
import { useEffect, useState } from "react";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";

export function UserDetails() {

    const params = useParams();
    const id = Number(params.userId);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        userService.getOneUser(id)
            .then(user => setUser(user))
            .catch(err => notify.error(err));
    }, []);

    function getRole(roleId: number): string {
        return roleId === 1 ? "Admin" : "User";
    }

    return (
        <div className="UserDetails">

            <h3>First name: {user?.firstName}</h3>
            <h3>Last name: {user?.lastName}</h3>
            <h3>Email: {user?.email}</h3>
            <h3>Role: {getRole(user?.roleId!)}</h3>

        </div>
    );
}
