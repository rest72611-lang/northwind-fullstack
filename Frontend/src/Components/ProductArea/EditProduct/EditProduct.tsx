import { useForm } from "react-hook-form";
import "./EditProduct.css";
import { ProductModel } from "../../../Models/ProductModel";
import { notify } from "../../../Utils/Notify";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../../../Services/ProductService";
import { useEffect, useState } from "react";

export function EditProduct() {

    const [imageUrl, setImageUrl] = useState<string>("");
    const { register, handleSubmit, setValue } = useForm<ProductModel>()
    const navigate = useNavigate();
    const params = useParams();
    const id = Number(params.prodId);

    useEffect(() => {
        productService.getOneProduct(id)
            .then(product => {
                // Init value in text fields: 
                setValue("name", product.name);
                setValue("price", product.price);
                setValue("stock", product.stock);
                setImageUrl(product.imageUrl!);
            })
            .catch(err => notify.error(err));
    }, []);

    async function send(product: ProductModel) {
        try {
            product.id = id;
            product.image = (product.image as unknown as FileList)[0];
            await productService.updateProduct(product);
            notify.success("Product has been updated.");
            navigate("/products/details/" + id);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price: </label>
                <input type="number" {...register("price")} required min="0" max="1000" step="0.01" />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min="0" max="1000" />

                <label>Image: </label>
                <input type="file" {...register("image")} accept="image/*" />

                <img src={imageUrl} />

                <button>Update</button>

            </form>

        </div>
    );
}
