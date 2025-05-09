import { api } from "@/config/app";
import { GetServices } from "./services";
import { routesApi } from "@/config/apiRoutes";
import { useAuthStore } from "@/store/authStore";



export const getServices: GetServices = async () => {
    const response = await api.get(routesApi.services.all, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
};