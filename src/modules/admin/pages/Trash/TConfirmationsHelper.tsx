import { TableHelperHook } from "@/core/@types/core";
import { useTimeFormatPost } from "@/core/hooks/timeFormats";
import { NotificationModel } from "@/modules/client/hooks/services/services";
import { useTranslation } from "react-i18next";


export const useTableConfirmationsHelper: TableHelperHook<NotificationModel> = (action) => {
    const {format} = useTimeFormatPost('post');
    const [t] = useTranslation('client');

    return {
        columns: [
            {
                header: 'N°',
                render(item, index) {
                    return index;
                },
            },
            {
               header: t('login.labels.Confirmation date'),
                render(item) {
                    return format(item?.created_at ?? '');
                }, 
            }
        ],
        actions: {
            header: 'Actions',
            list: {
                render: action
            }
        }
    };

};