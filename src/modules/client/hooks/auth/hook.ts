import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginForm } from "../../validations/loginSchema";
import { accountChanges, auth as authFn, changePassword, forgotPassword, logoutFn, verifyTokenForgotPassword } from "./queries";
import { showError } from "@/core/utilities/errors";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { webRoutes } from "@/config/webRoutes";
import { AccountChangesForm, ResetPasswordForm } from "./auth";



export const useAuthApp = () => {
    const navigate = useNavigate();

    const auth = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: LoginForm) => authFn(data),
        onError(error) {
            showError(error);
        },
        onSuccess(){
            Promise.resolve(navigate('/admin'));
        }
    });

    return {auth};
};


export const useLogout = () => {
    const navigate = useNavigate();
    const endSession = useAuthStore((state) => state.logout);

    const logout = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => logoutFn(),
        onSuccess(){
            endSession();
            navigate(webRoutes.home.path);
        },
        onError(error) {
            if(error){
                showError(error);
                navigate(webRoutes.home.path);
                endSession();
            }
        },
    });

    return {logout};
};




export const useAccountChangesPut = (id?: string | number) => {

    const put = useMutation({
        mutationKey: ['auth','update'],
        mutationFn: (data: AccountChangesForm) => accountChanges(data, String(id)),
    });

    return {put};
};

export const useForgotPassword = () => {

    const forgot = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: (data: {email: string}) => forgotPassword(data),
    });


    return { forgot };
};


export const useVerifyTokenChangePassword = (params: {token: string}) => {
    const hook = useQuery({
        queryKey: ['verify-password'],
        queryFn: () => verifyTokenForgotPassword(params),
    });

    return {...hook};
};


export const useChangePassword = () => {

    const change = useMutation({
        mutationKey: ['change-password'],
        mutationFn: (data: ResetPasswordForm) => changePassword(data),
    });


    return { change };
};