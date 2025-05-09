import { ResponseSuccessApi, ResponseUpdateApi } from "@/core/@types/core";

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
    id: number;
    title: string;
    header: string;
    subheader: string;
    list: ListTranslations;
    trans: TransTranslations;
    picture?: string;
}

export type PictureForm = {
    picture: File ;
};

export type GetServices = {
    (): Promise<ResponseSuccessApi<ServiceData[]>['data']>;
};


export type SetPictureService = {
    (id: string,data: PictureForm): Promise<ResponseUpdateApi<ServiceData>['data']>;
};


export type GetService = {
    (id: string): Promise<ResponseSuccessApi<ServiceData>['data']>;
};