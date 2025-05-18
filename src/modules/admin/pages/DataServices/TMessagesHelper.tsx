import { TableHelperHook } from "@/core/@types/core";
import { useTimeFormatPost } from "@/core/hooks/timeFormats";
import { NotificationModel } from "@/modules/client/hooks/services/services";


export const useTableMessagesHelper: TableHelperHook<NotificationModel> = (action) => {
    const {format} = useTimeFormatPost('post');

    return {
        columns: [
            {
                header: 'N°',
                render(item, index) {
                    return index;
                },
            },
            {
               header: 'Correo electrónico',
                render(item) {
                    return <a href={`mailto:${item?.email}`}><span className="text-primary font-semibold">{item?.email}</span></a>;
                }, 
            },
            {
               header: 'Mensaje',
                render(item) {
                    return item?.payload;
                }, 
            },
            {
               header: 'Fecha de contacto',
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