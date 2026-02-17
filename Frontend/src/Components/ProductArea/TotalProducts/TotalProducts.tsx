import "./TotalProducts.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

export function TotalProducts() {

    // Listen to global state, rerender this component when state.products.length changes:
    const count = useSelector<AppState, number>(state => state.products.length);

    return (
        <div className="TotalProducts">

			<p>Total Products: {count} </p>

        </div>
    );
}
