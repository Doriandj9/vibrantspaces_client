import { ResponseSuccessApi } from "@/core/@types/core";
import { LoginForm } from "../../validations/loginSchema";

export type ResponseUserProps = {
    token: string;
    time_expired_token: string;
    jwt: string;
};


export type Auth = {
    (data: LoginForm): Promise<ResponseSuccessApi<ResponseUserProps>['data']>;
};

export type Logout = {
    (): Promise<ResponseSuccessApi<string>['data']>;
};