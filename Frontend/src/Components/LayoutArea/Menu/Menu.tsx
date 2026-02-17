import { NavLink } from "react-router-dom";
import "./Menu.css";
import { TotalProducts } from "../../ProductArea/TotalProducts/TotalProducts";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";

export function Menu() {

    const user = useSelector<AppState, UserModel>(state => state.user);

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <NavLink to="/products" end>Products</NavLink>

            <NavLink to="/products/new">Add Product</NavLink>

            {user && <NavLink to="/top-3-products">Top 3 Products</NavLink>}

            {user?.role === "Admin" && <NavLink to="/out-of-stock">Out-of-Stock Products</NavLink>}

            <NavLink to="/employees">Employees</NavLink>

            <NavLink to="/employees/new">Add Employee</NavLink>

            <NavLink to="/about">About</NavLink>

            <NavLink to="/contact-us">Contact Us</NavLink>

            <TotalProducts />

        </div>
    );
}
