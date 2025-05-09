import { api } from "@/config/app";
import { GetServices, SetPictureService } from "./services";
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

export const setPictureService: SetPictureService = async (id,data) => {
    const response = await api.post(routesApi.services.children().setImage.replace('{id}', id), data,{
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
             'Content-Type': 'multipart/form-data',
        }
    });

    return response.data?.data || null;
};