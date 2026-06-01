class AppConfig {

    private readonly apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

	public readonly productsUrl = `${this.apiBaseUrl}/products/`;
    public readonly employeesUrl = `${this.apiBaseUrl}/employees/`;
    public readonly registerUrl = `${this.apiBaseUrl}/register/`;
    public readonly loginUrl = `${this.apiBaseUrl}/login/`;
    public readonly usersUrl = `${this.apiBaseUrl}/users/`;
    public readonly ragUrl = `${this.apiBaseUrl}/rag`;

    public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig();
