import { TableHelperHook } from "@/core/@types/core";
import { useTimeFormatPost } from "@/core/hooks/timeFormats";
import { DataServiceModel } from "@/modules/client/hooks/services/services";


export const useTableDataServicesHelper: TableHelperHook<DataServiceModel> = (action) => {
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
                header: 'Nombre del cliente',
                render(item) {
                    return item?.user.name;
                },
            },
            {
                header: 'Correo electrónico',
                render(item) {
                    return <a href={`mailto:${item?.user.email}`}>{item?.user.email}</a>;
                },
            },
            {
                header: 'Contacto',
                render(item) {
                    return item?.user.contact_number;
                },
            },
            {
               header: 'Fecha de solicitud',
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