import { useMutation, useQuery } from "@tanstack/react-query";
import { getAppSettings, putAppSettings } from "./queries";
import { AppSettingsModel } from "./app";



export const useGetAppSettings = () => {
    const hook = useQuery({
        queryKey: ['app-settings'],
        queryFn: getAppSettings
    });


    return {
        ...hook
    };
};

export const usePutAppSettings = () => {
    const put = useMutation({
        mutationKey: ['put','app-settings'],
        mutationFn: (data: AppSettingsModel) => putAppSettings(data)
    });

    return {put};
};