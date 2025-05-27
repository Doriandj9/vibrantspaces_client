import { ResponseCreateApi, ResponseSuccessApi, ResponseUpdateApi, User } from "@/core/@types/core";

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
    created_at?: string;
    updated_at?: string;
}

export type PictureForm = {
    picture: File;
};

export type GetServices = {
    (): Promise<ResponseSuccessApi<ServiceData[]>['data']>;
};


export type SetPictureService = {
    (id: string, data: PictureForm): Promise<ResponseUpdateApi<ServiceData>['data']>;
};


export type GetService = {
    (id: string): Promise<ResponseSuccessApi<ServiceData>['data']>;
};

type NotificationModel = {
    id: string | number;
    sender: number;          // user ID
    receiver: number;        // user ID
    payload: string;         // text payload
    type: string;            // default: 'TEXT', could be union type if enum-like
    doc_status: 'AC' | 'DL' | 'DR';          // from DocStatus, default: 'ACTIVE'
    created_by?: number | null; // nullable user ID
    updated_by?: number | null; // nullable user ID
    created_at?: string;
    updated_at?: string;
    email?: string;
    doc_type: 'NT' | 'MS';
};


export type DataServiceModel = {
    id: string | number;
    type_contact: string;
    description_area: string;
    bathrooms?: number | null;
    rooms?: number | null;
    kitchens?: number | null;
    meters?: number | null;
    yard?: number | null;    // patio o jardín
    stairs?: number | null;  // escaleras
    services_id: number | string;
    user_id: number | string;
    user: User;
    created_at?: string;
    updated_at?: string;
    confirmations: NotificationModel[],
    doc_status: 'AC' | 'DL' | 'DR'; // from DocStatus, default: 'ACTIVE'
    service: ServiceData
};


export type FormDataService = {
    name: string;
    contact_number: string;
    email: string;
    address: string;
    type_contact: string;
    description_area: string;
    bathrooms?: number | string;
    rooms?: number | string;
    services_id: string | number;
};

export type StoreDataServices = {
    (data: FormDataService): Promise<ResponseCreateApi<DataServiceModel>['data']>;
};

export type GetUserService = {
    (tax_id): Promise<ResponseSuccessApi<User>['data']>;
};

export type ParamsDocStatus = {
    doc_status: 'AC' | 'DL' | 'DR'; // from DocStatus, default: 'ACTIVE'
};

export type GetDataServices = {
    (params?:ParamsDocStatus): Promise<ResponseSuccessApi<DataServiceModel[]>['data']>;
};

export type GetDataMessages = {
    (params?:ParamsDocStatus): Promise<ResponseSuccessApi<NotificationModel[]>['data']>;
};


export type StoreMessageConfirmation = {
    payload: string;
    type: 'HTML';
    sender: string | number;
    receiver: string | number;
    data_service_id:string | number;
};

export type StoreMessageContact = {
    payload: string;
    type: 'TXT';
    receiver: '1';
    doc_type: 'MS';
    email: string;
};


export type StoreMessageConfirmationFn = {
    (data: StoreMessageConfirmation): Promise<ResponseSuccessApi<StoreMessageConfirmation>['data']>;
};


export type StoreMessageContactFn = {
    (data: StoreMessageContact): Promise<ResponseSuccessApi<StoreMessageContact>['data']>;
};