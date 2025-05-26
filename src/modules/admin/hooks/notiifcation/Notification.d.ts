import { ResponseSuccessApi } from "@/core/@types/core";
import { DataServiceModel, NotificationModel } from "@/modules/client/hooks/services/services";


type PutNotification = {
    (data: Partial<NotificationModel>, id: string ): Promise<ResponseSuccessApi<NotificationModel>>;
};

type PutServiceData = {
    (data: Partial<DataServiceModel>, id: string ): Promise<ResponseSuccessApi<DataServiceModel>>;
};