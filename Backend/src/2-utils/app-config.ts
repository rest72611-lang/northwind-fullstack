import dotenv from "dotenv";

// Load .env file into process.env object:
dotenv.config({ quiet: true });

class AppConfig {

    public readonly environment = process.env.ENVIRONMENT;
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";

    public readonly port = Number(process.env.PORT) || 4000;
    public readonly mysqlHost = process.env.MYSQL_HOST;
    public readonly mysqlUser = process.env.MYSQL_USER;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    public readonly imagesLocation = process.env.IMAGES_LOCATION!;
    public readonly jwtSecret = process.env.JWT_SECRET!;
    public readonly hashSalt = process.env.HASH_SALT!;
    public readonly recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY!;
    public readonly recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
    public readonly openaiApiKey = process.env.OPENAI_API_KEY;

}

export const appConfig = new AppConfig();
