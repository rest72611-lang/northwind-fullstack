import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "../../PageArea/About/About";
import { Home } from "../../PageArea/Home/Home";
import { PageNotFound } from "../../PageArea/PageNotFound/PageNotFound";
import { ProductList } from "../../ProductArea/ProductList/ProductList";
import "./Routing.css";
import { ContactUs } from "../../PageArea/ContactUs/ContactUs";
import { EmployeeList } from "../../EmployeeArea/EmployeeList/EmployeeList";
import { ProductDetails } from "../../ProductArea/ProductDetails/ProductDetails";
import { EmployeeDetails } from "../../EmployeeArea/EmployeeDetails/EmployeeDetails";
import { AddProduct } from "../../ProductArea/AddProduct/AddProduct";
import { EditProduct } from "../../ProductArea/EditProduct/EditProduct";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { Top3 } from "../../ProductArea/Top3/Top3";
import { OutOfStock } from "../../ProductArea/OutOfStock/OutOfStock";
import { UserDetails } from "../../UserArea/UserDetails/UserDetails";

export function Routing() {
    return (
        <div className="Routing">
            <Routes>

                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route path="/users/details/:userId" element={<UserDetails />} />

                <Route path="/home" element={<Home />} />

                <Route path="/products" element={<ProductList />} />
                
                <Route path="/products/details/:prodId" element={<ProductDetails />} />

                <Route path="/products/new" element={<AddProduct />} />

                <Route path="/products/edit/:prodId" element={<EditProduct />} />

                <Route path="/top-3-products" element={<Top3 />} />

                <Route path="/out-of-stock" element={<OutOfStock />} />

                <Route path="/employees" element={<EmployeeList />} />

                <Route path="/employees/details/:empId" element={<EmployeeDetails />} />

                <Route path="/about" element={<About />} />

                <Route path="/contact-us" element={<ContactUs />} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}
