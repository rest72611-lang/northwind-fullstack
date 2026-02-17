import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import "./Header.css";

export function Header() {
    return (
        <div className="Header">

            <UserMenu />

			<h1>Northwind Traders</h1>
            
        </div>
    );
}
