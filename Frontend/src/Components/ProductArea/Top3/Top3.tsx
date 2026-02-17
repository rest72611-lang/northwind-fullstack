import { useEffect, useState } from "react";
import { ProductModel } from "../../../Models/ProductModel";
import { productService } from "../../../Services/ProductService";
import { notify } from "../../../Utils/Notify";
import { ProductCard } from "../ProductCard/ProductCard";
import "./Top3.css";

export function Top3() {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(()=>{
        productService.getTop3()
            .then(products => setProducts(products))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="Top3">

			<h2>Top 3 Products: </h2>

            {products.map(p => <ProductCard key={p.id} product={p} /> )}

        </div>
    );
}
