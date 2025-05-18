import { TableHelperHook } from "@/core/@types/core";
import { useTimeFormatPost } from "@/core/hooks/timeFormats";
import { NotificationModel } from "@/modules/client/hooks/services/services";


export const useTableConfirmationsHelper: TableHelperHook<NotificationModel> = (action) => {
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
               header: 'Fecha de confirmación',
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