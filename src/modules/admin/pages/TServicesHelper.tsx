import { TableHelperHook } from "@/core/@types/core";
import { ServiceData } from "@/modules/client/hooks/services/services";
import { useLanguageApp } from "@/store/languageStore";


export const useTableServicesHelper: TableHelperHook<ServiceData> = (action) => {
    const lang = useLanguageApp((state) => state.language);

    return {
        columns: [
            {
                header: 'N°',
                render(item, index) {
                    return index;
                },
            },
            {
                header: 'Nombre',
                render(item) {
                    return item?.trans.translations[lang].title;
                },
            },
        ],
        actions: {
            header: 'Acciones',
            list: {
                render: action
            }
        }
    };

};