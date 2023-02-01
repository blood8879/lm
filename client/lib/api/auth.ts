import axios from "axios";
import { UserType } from "../../types/user";

interface signUpAPIBody {
    email: string;
    name: string;
    password: string;
}

interface LoginAPIBody {
    email: string;
    password: string;
}

export const signupAPI = (body: signUpAPIBody) =>
    axios.post<UserType>("/api/auth/signup", body);

export const loginAPI = (body: LoginAPIBody) =>
    axios.post<UserType>("/api/auth/login", body);