class AppConfig {

	public readonly productsUrl = "http://localhost:4000/api/products/";
    public readonly employeesUrl = "http://localhost:4000/api/employees/";
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly usersUrl = "http://localhost:4000/api/users/";
    
    public readonly chatGptUrl = "https://api.openai.com/v1/chat/completions";
    public readonly chatGptApiKey = import.meta.env.VITE_CHATGPT_API_KEY;
    public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig();
