import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { productService } from "../../../Services/ProductService";
import { notify } from "../../../Utils/Notify";
import "./AddProduct.css";

export function AddProduct() {

    const { register, handleSubmit } = useForm<ProductModel>();
    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try {
            product.image = (product.image as unknown as FileList)[0];
            console.log(product);
            await productService.addProduct(product);
            notify.success("Product has been added.");
            navigate("/products");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price: </label>
                <input type="number" {...register("price")} required min="0" max="1000" step="0.01" />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min="0" max="1000" />

                <label>Image: </label>
                <input type="file" {...register("image")} required accept="image/*" />

                <button>Add</button>

            </form>

        </div>
    );
}
