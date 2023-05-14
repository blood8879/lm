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

// 회원가입 api
export const signupAPI = (body: signUpAPIBody) =>
    axios.post<UserType>("/api/auth/signup", body);

// 로그인 api
export const loginAPI = (body: LoginAPIBody) =>
    axios.post<UserType>("/api/auth/login", body);

// 로그아웃 api
export const logoutAPI = () => axios.post("/api/auth/logout");

// 로그인 유지하기 api
export const meAPI = () => axios.get("/api/auth/me");

// 회원정보 api
export const getProfileAPI = () => axios.put("/api/auth/changeProfile");