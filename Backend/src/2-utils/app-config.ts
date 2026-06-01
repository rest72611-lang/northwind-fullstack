import dotenv from "dotenv";
import path from "path";

// Load .env file into process.env object:
dotenv.config({ path: path.join(__dirname, "..", "..", ".env"), quiet: true });

class AppConfig {

    public readonly environment = process.env.ENVIRONMENT;
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";

    public readonly port = Number(process.env.PORT) || 4000;
    public readonly mysqlHost = process.env.MYSQL_HOST;
    public readonly mysqlUser = process.env.MYSQL_USER;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    public readonly mysqlPort = Number(process.env.MYSQL_PORT) || 3306;
    public readonly imagesLocation = process.env.IMAGES_LOCATION || `http://localhost:${this.port}/api/products/images/`;
    public readonly employeeImagesLocation = process.env.EMPLOYEE_IMAGES_LOCATION || `http://localhost:${this.port}/api/employees/images/`;
    public readonly jwtSecret = process.env.JWT_SECRET!;
    public readonly hashSalt = process.env.HASH_SALT!;
    public readonly recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY!;
    public readonly recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
    public readonly openaiApiKey = process.env.OPENAI_API_KEY;

    public constructor() {
        this.validateMySqlConfig();

        if (!this.isProduction) {
            console.log(`MySQL config loaded for ${this.mysqlUser}@${this.mysqlHost}:${this.mysqlPort}/${this.mysqlDatabase}`);
        }
    }

    private validateMySqlConfig(): void {
        if (this.isProduction) return;

        const missingVariables = [
            ["MYSQL_HOST", this.mysqlHost],
            ["MYSQL_USER", this.mysqlUser],
            ["MYSQL_PASSWORD", this.mysqlPassword],
            ["MYSQL_DATABASE", this.mysqlDatabase]
        ]
            .filter(([, value]) => !value)
            .map(([name]) => name);

        if (missingVariables.length > 0) {
            throw new Error(`Missing MySQL environment variables (${missingVariables.join(", ")}). Create Backend/.env from Backend/.env.example. Do not edit only .env.example.`);
        }
    }

}

export const appConfig = new AppConfig();
