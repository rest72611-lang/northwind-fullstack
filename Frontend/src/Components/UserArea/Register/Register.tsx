import { useForm } from "react-hook-form";
import "./Register.css";
import { UserModel } from "../../../Models/UserModel";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { AccountCircle, Cancel, HowToReg } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import { appConfig } from "../../../Utils/AppConfig";
import { useState } from "react";

// https://developers.google.com/recaptcha/docs/faq

export function Register() {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState<string | null>("");

    async function send(user: UserModel) {
        try {
            if(!captchaToken) {
                notify.error("Please verify that you are a human.");
                return;
            }
            user.captchaToken = captchaToken;
            await userService.register(user);
            notify.success(`Welcome ${user.firstName} ${user.lastName}!`);
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    function saveCaptchaToken(captchaToken: string | null): void {
        console.log(captchaToken);
        setCaptchaToken(captchaToken);
    }

    return (
        <div className="Register">

            <Typography variant="h4" color="primary" className="spacing">
                Register to Northwind
                &nbsp;
                <HowToReg fontSize="large" className="middle" />
            </Typography>

            <form onSubmit={handleSubmit(send)}>

                <TextField label="First name" fullWidth {...register("firstName")} required />

                <TextField label="Last name" fullWidth {...register("lastName")} required />

                <TextField label="Email" type="email" fullWidth {...register("email")} required />

                <TextField label="Password" type="password" fullWidth {...register("password")} required />

                <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />

                <ReCAPTCHA sitekey={appConfig.recaptchaSiteKey} onChange={saveCaptchaToken} />

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary"> <AccountCircle /> &nbsp; Register</Button>
                    <Button type="reset" color="secondary"> <Cancel /> &nbsp; Clear</Button>
                </ButtonGroup>

            </form>

        </div>
    );
}
