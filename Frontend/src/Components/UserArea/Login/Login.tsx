import { useForm } from "react-hook-form";
import "./Login.css";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";

export function Login() {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome Back!");
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <label>Email: </label>
                <input type="email" {...register("email")} required />

                <label>Password: </label>
                <input type="password" {...register("password")} required minLength={4} maxLength={100} />

                <button>Login</button>

            </form>

        </div>
    );
}
