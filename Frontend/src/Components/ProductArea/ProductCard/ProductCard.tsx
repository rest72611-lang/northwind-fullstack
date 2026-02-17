import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import "./ProductCard.css";

type ProductCardProps = {
    product: ProductModel;
};

export function ProductCard(props: ProductCardProps) {

    const navigate = useNavigate();

    function details() {
        navigate("/products/details/" + props.product.id);
    }

    return (
        <div className="ProductCard" onClick={details}>

            <div>
                <span>{props.product.name}</span>
                <span>Price: {props.product.price}</span>
                <span>Stock: {props.product.stock}</span>
            </div>

            <div>
                <img src={props.product.imageUrl} />
            </div>

        </div>
    );
}
