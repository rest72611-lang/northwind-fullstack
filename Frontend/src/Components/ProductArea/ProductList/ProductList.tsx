import { useEffect, useState } from "react";
import { ProductModel } from "../../../Models/ProductModel";
import { productService } from "../../../Services/ProductService";
import "./ProductList.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";

export function ProductList() {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productService.getAllProducts()
            .then(products => setProducts(products))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="ProductList">

            {products.length === 0 && <Spinner />}

            {products.map(p => <ProductCard key={p.id} product={p} /> )}

        </div>
    );
}
