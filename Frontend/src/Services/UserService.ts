import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";
import { userSlice } from "../Redux/UserSlice";
import { store } from "../Redux/Store";

class UserService {

    // Restore user from storage if exist:
    public constructor() {

        // Load token from storage: 
        const token = localStorage.getItem("token");

        // If exists: 
        if (token) {

            // Extract user:
            const container = jwtDecode<{ user: UserModel }>(token);
            const dbUser = container.user;
            
            // Save to global state:
            const action = userSlice.actions.initUser(dbUser);
            store.dispatch(action);
        }
    }

    // Register as a new user: 
    public async register(user: UserModel): Promise<void> {

        // Send user to backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Get back token: 
        const token = response.data;
        localStorage.setItem("token", token);

        // Extract user: 
        const container = jwtDecode<{ user: UserModel }>(token);
        const dbUser = container.user;

        // Save to global state:
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    // Login as existing user: 
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend: 
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Get back token: 
        const token = response.data;
        localStorage.setItem("token", token);

        // Extract user: 
        const container = jwtDecode<{ user: UserModel }>(token);
        const dbUser = container.user;

        // Save to global state:
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    // Logout: 
    public logout(): void {

        // Delete from storage: 
        localStorage.removeItem("token");

        // Save to global state:
        const action = userSlice.actions.logoutUser();
        store.dispatch(action);
    }

    // Get user details: 
    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersUrl + id);
        const user = response.data;
        return user;
    }

}

export const userService = new UserService();
