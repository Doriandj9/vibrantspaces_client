import { TableHelperHook } from "@/core/@types/core";
import { useTimeFormatPost } from "@/core/hooks/timeFormats";
import { appLoadImage } from "@/core/utilities/img/convert";
import { ServiceData } from "@/modules/client/hooks/services/services";
import { useLanguageApp } from "@/store/languageStore";
import { useTranslation } from "react-i18next";
import { ImFilePicture } from "react-icons/im";

export const useTableServicesHelper: TableHelperHook<ServiceData> = (action) => {
    const lang = useLanguageApp((state) => state.language);
    const [t] = useTranslation('client');
    const {format} = useTimeFormatPost('date');

    return {
        columns: [
            {
                header: 'N°',
                render(item, index) {
                    return index;
                },
            },
            {
                header: t('login.labels.Name'),
                render(item) {
                    return item?.trans.translations[lang].title;
                },
            },
            {
                header: 'Img',
                render(item) {
                    if (!item?.picture) {
                        return <ImFilePicture />;
                    };
                    return <>
                        <img src={appLoadImage(item?.picture ?? '')} className="w-12 h-10" alt={item.title} />
                    </>;
                },
            },
             {
                header: t('login.labels.created_at'),
                render(item) {
                    
                    return item?.created_at ? format(item?.created_at) : 'N/A';
                },
            },
            {
                header: t('login.labels.updated_at'),
                render(item) {
                    
                    return item?.updated_at ? format(item?.updated_at) : 'N/A';
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