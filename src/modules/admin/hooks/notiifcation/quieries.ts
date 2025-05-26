import { api } from "@/config/app";
import { PutNotification, PutServiceData } from "./Notification";
import { routesApi } from "@/config/apiRoutes";
import { useAuthStore } from "@/store/authStore";


export const putNotification: PutNotification = async (data, id) => {
    const response = await api.put(routesApi.services.data_services.children().update_notify.replace('{id}', id), data, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });
    return response.data?.data || null;
};


export const putServiceData: PutServiceData = async (data, id) => {
    const response = await api.put(routesApi.services.data_services.children().update_service_data.replace('{id}', id), data, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });
    return response.data?.data || null;
};