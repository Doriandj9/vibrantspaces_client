import { TableHelperHook } from "@/core/@types/core";
import { appLoadImage } from "@/core/utilities/img/convert";
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
            {
                header: 'Imagen',
                render(item) {
                    if (!item?.picture) return;
                    return <>
                        <img src={appLoadImage(item?.picture ?? '')} className="w-12 h-10" alt={item.title} />
                    </>;
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