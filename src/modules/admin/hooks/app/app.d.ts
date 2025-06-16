import { ResponseSuccessApi } from "@/core/@types/core";

export type AppSettingsModel = {

    phone_number?: string;
};


export type GetAppSettingsFn = {
    (): Promise<ResponseSuccessApi<AppSettingsModel>['data']>;
};


export type PutAppSettingsFn = {
    (data: AppSettingsModel): Promise<ResponseSuccessApi<AppSettingsModel>['data']>;
};