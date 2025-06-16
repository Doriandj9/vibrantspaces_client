import { api } from "@/config/app";
import { GetAppSettingsFn, PutAppSettingsFn } from "./app";
import { useAuthStore } from "@/store/authStore";




export const getAppSettings: GetAppSettingsFn = async() => {

    const response = await api.get('app-settings',{
         headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });
    
    return response.data?.data || null;
};


export const putAppSettings: PutAppSettingsFn = async(data) => {

    const response = await api.put('app-settings/1',data, {
         headers: {
            'Authorization': `Bearer ${(useAuthStore.getState()).token}`,
            'X-lang': localStorage.getItem('languageApp') ?? 'es',
        }
    });
    
    return response.data?.data || null;
};
