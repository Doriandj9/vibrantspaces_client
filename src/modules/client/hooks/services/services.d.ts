import { ResponseSuccessApi } from "@/core/@types/core";

interface TranslationValues {
    title: string;
    is_active: boolean;
    order: number;
}

interface LanguageTranslation {
    values: TranslationValues[];
}

interface ListTranslations {
    translations: {
        es: LanguageTranslation;
        en: LanguageTranslation;
    };
}

interface TransTranslations {
    translations: {
        es: {
            title: string;
            header: string;
            subheader: string;
        };
        en: {
            title: string;
            header: string;
            subheader: string;
        };
    };
}

interface ServiceData {
    title: string;
    header: string;
    subheader: string;
    list: ListTranslations;
    trans: TransTranslations;
}


export type GetServices = {
    (): Promise<ResponseSuccessApi<ServiceData[]>['data']>;
};