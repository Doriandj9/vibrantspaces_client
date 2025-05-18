import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "../../validations/loginSchema";
import { accountChanges, auth as authFn, logoutFn } from "./queries";
import { showError } from "@/core/utilities/errors";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { webRoutes } from "@/config/webRoutes";
import { AccountChangesForm } from "./auth";



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

