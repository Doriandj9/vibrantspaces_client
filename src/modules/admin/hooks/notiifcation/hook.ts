import { DataServiceModel, NotificationModel } from "@/modules/client/hooks/services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putNotification, putServiceData } from "./quieries";


export const usePutNotification = (notificationId: string) => {
    const client = useQueryClient();

    const put = useMutation({
        mutationKey: ['put-notification', notificationId],
        mutationFn: (data: Partial<NotificationModel>) => putNotification(data, notificationId),
        onSuccess() {
            client.invalidateQueries({ queryKey: ['data-messages'] });
        }
    });

    return { put };
};

export const usePutServiceData = (id: string) => {
    const client = useQueryClient();

    const put = useMutation({
        mutationKey: ['put-service-data', id],
        mutationFn: (data: Partial<DataServiceModel>) => putServiceData(data, id),
        onSuccess() {
            client.invalidateQueries({ queryKey: ['data-services'] });
        }
    });

    return { put };
};