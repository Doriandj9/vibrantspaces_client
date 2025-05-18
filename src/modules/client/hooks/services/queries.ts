import { api } from "@/config/app";
import { GetDataMessages, GetDataServices, GetService, GetServices, GetUserService, SetPictureService, StoreDataServices, StoreMessageConfirmationFn, StoreMessageContactFn } from "./services";
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


export const getService: GetService = async (id) => {
    const response = await api.get(routesApi.services.all + `/${id}`, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es'
        }
    });

    return response.data?.data;
};

export const setPictureService: SetPictureService = async (id, data) => {
    const response = await api.post(routesApi.services.children().setImage.replace('{id}', id), data, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data?.data || null;
};


export const storeDataServices: StoreDataServices = async (data) => {
    const response = await api.post(routesApi.services.data_services.resource, data, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });

    return response.data?.data || null;
};


export const getUserService: GetUserService = async (taxId) => {
    const response = await api.get(routesApi.services.data_services.children().user.replace('{tax_id}', taxId), {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });

    return response.data?.data || null;
};

export const getDataServices: GetDataServices = async () => {
    const response = await api.get(routesApi.services.data_services.resource, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });

    return response.data?.data || null;
};
 
export const getMessage: GetDataMessages = async () => {
    const response = await api.get(routesApi.services.data_services.children().message_get, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });

    return response.data?.data || null;
};
 

export const storeMessageConfirmation: StoreMessageConfirmationFn = async (data) => {
    const response = await api.post(routesApi.services.data_services.children().send_confirmation, data, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });

    return response.data?.data || null;
};


export const storeMessageContact: StoreMessageContactFn = async (data) => {
    const response = await api.post(routesApi.services.data_services.children().message, data, {
        headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });

    return response.data?.data || null;
};
