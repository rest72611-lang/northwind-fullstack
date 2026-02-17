import { Role } from "./enums";
import joi from "joi";
import { ValidationError } from "./errors";
import { passwordStrength } from "../2-utils/password";

export class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: Role;
    public captchaToken: string;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
        this.captchaToken = user.captchaToken;
    }

    private static schema = joi.object({
        id: joi.number().optional().positive().integer(),
        firstName: joi.string().required().min(2).max(30),
        lastName: joi.string().required().min(2).max(30),
        email: joi.string().email(),
        password: joi.string().required().min(2).max(30).custom(value => {
            if(!passwordStrength.isStrong(value))
                throw new ValidationError("Weak password...");
        }),
        roleId: joi.number().optional(),
        captchaToken: joi.string().required().min(100).max(5000)
    });

    public validate(): void {
        const result = UserModel.schema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}