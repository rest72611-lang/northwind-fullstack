import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { productService } from "../../../Services/ProductService";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./ProductDetails.css";

export function ProductDetails() {

    const [product, setProduct] = useState<ProductModel>();
    const [review, setReview] = useState<string>("");
    const [fetching, setFetching] = useState<boolean>(false);
    const params = useParams();
    const navigate = useNavigate();
    const id = Number(params.prodId);

    useEffect(() => {
        productService.getOneProduct(id)
            .then(product => setProduct(product))
            .catch(err => notify.error(err));
    }, []);

    async function deleteMe() {
        try {
            const sure = confirm("Are you sure?");
            if (!sure) return;
            await productService.deleteProduct(id);
            notify.success("Product has been deleted.");
            navigate("/products");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    function navigateToEdit() {
        navigate("/products/edit/" + id);
    }

    async function aiReview() {
        try {
            setFetching(true);
            const review = await productService.getAiReview(product?.name!);
            setReview(review);
            setFetching(false);
        }
        catch (err: any) {
            notify.error(err);
            setFetching(false);
        }
    }

    return (
        <div className="ProductDetails">

            {!product && <Spinner />}

            {product && <div>
                <h3>Name: {product?.name}</h3>
                <h3>Price: {product?.price}</h3>
                <h3>Stock: {product?.stock}</h3>
                <img src={product?.imageUrl} />
                <br /><br />
                <button onClick={navigateToEdit}>Edit</button>
                <button onClick={deleteMe}>Delete</button>
                <button onClick={aiReview} disabled={fetching}>AI Review</button>
                <hr />
                {fetching && <Spinner />}
                {!fetching && <div dangerouslySetInnerHTML={{ __html: review }}></div>}
            </div>}

        </div>
    );
}
