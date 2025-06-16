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

export type AccountChangesForm = {
    name: string;
    email: string;
    password?: string;
    repeat_password?: string;
    phone_number?: string;
};

export type PutAccountChanges = {
    (data: AccountChangesForm, id: string): Promise<ResponseSuccessApi<ResponseUserProps>['data']>;
}


export type ForgotPasswordFn = {
    ({ email: string }): Promise<ResponseSuccessApi<string>['data']>;
};

export type ResetPasswordForm = {
    email:string;
    password:string;
    repeat_password?:string;
};

export type VerifyToken = {
    (params: { token: string }): Promise<ResponseSuccessApi<{ email: string }>['data']>;
};


export type ChangePassword = {
    (data: ResetPasswordForm): Promise<ResponseSuccessApi<string>['data']>;
};