import { api } from "@/config/app";
import { Auth, Logout, PutAccountChanges } from "./auth";
import { routesApi } from "@/config/apiRoutes";
import { useAuthStore } from "@/store/authStore";



export const auth: Auth = async (data) => {
    const response = await api.post(routesApi.auth.login,data,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data || null;
};

export const logoutFn: Logout = async () => {
    const response = await api.post(routesApi.auth.logout,undefined,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data || null;
};


export const accountChanges: PutAccountChanges  = async (data,id) => {
    const response = await api.put(`${routesApi.auth.user}/${id}`,data,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data || null;
};