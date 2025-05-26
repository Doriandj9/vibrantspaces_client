import { TableHelperHook } from "@/core/@types/core";
import { useTimeFormatPost } from "@/core/hooks/timeFormats";
import { NotificationModel } from "@/modules/client/hooks/services/services";
import { useTranslation } from "react-i18next";


export const useTableMessagesHelper: TableHelperHook<NotificationModel> = (action) => {
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
               header: t('login.labels.email'),
                render(item) {
                    return <a href={`mailto:${item?.email}`}><span className="text-primary font-semibold">{item?.email}</span></a>;
                }, 
            },
            {
               header: t('login.labels.message'),
                render(item) {
                    return item?.payload;
                }, 
            },
            {
               header: t('login.labels.date-of-contact'),
                render(item) {
                    return format(item?.created_at ?? '');
                }, 
            }
        ],
        actions: {
            header: '',
            width:'0px',
            list: {
                render: action
            }
        }
    };

};