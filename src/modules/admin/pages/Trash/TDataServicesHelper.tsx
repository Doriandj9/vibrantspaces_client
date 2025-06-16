import { TableHelperHook } from "@/core/@types/core";
import { useTimeFormatPost } from "@/core/hooks/timeFormats";
import { DataServiceModel } from "@/modules/client/hooks/services/services";
import { useTranslation } from "react-i18next";


export const useTableDataServicesHelper: TableHelperHook<DataServiceModel> = (action) => {
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
                header: t('login.labels.Client name'),
                render(item) {
                    return item?.user.name;
                },
            },
            {
                header: t('login.labels.email'),
                render(item) {
                    return <a  className="text-primary font-semibold dark:text-white" href={`mailto:${item?.user.email}`}>{item?.user.email}</a>;
                },
            },
            {
                header: t('login.labels.contact-number'),
                render(item) {
                    return item?.user.contact_number;
                },
            },
            {
               header: t('login.labels.Date of application'),
                render(item) {
                    return format(item?.created_at ?? '');
                }, 
            }
        ],
        actions: {
            header: 'Acciones',
            list: {
                render: action
            }
        }
    };

};