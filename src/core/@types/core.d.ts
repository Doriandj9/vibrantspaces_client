import { ButtonProps } from "@chakra-ui/react";

export type Children = {
    children?: React.ReactNode;
};


export type ButtonPrimaryType = ButtonProps & Children;

export type User ={
    name: string;
    rol: {
        name: 'Admin' | 'Client'
    },
    email: string;
};


export type ResponseSuccessApi<T> = {
    status: boolean;
    message: 'OK',
    data: T
};

export type ResponseCreateApi<T> = {
    status: true;
    message: 'Resource created successfully.' | string,
    data: T
};

export type ResponseUpdateApi<T> = {
    status: true;
    message: 'Resource updated successfully.' | string,
    data: T
};

export type ResponseDeleteApi<T> = {
    status: true;
    message: 'Resource deleted successfully.' | string,
    data: T
};

export type ResponseErrorApi = {
    status: false;
    message: 'An error occurred on the server, please try again later.' | string,
    _error: string
};

type ColumnsTableHelper<TData> = {
    header: string;
    render: {
        (item?: TData, index?: number): React.ReactNode
    };
};

export type ActionListTableHelper<TItem> = {
    render?: (item: TItem, index?: number) => React.ReactNode;
};

export type ResultTableHelperHook<TData> = {
    columns: ColumnsTableHelper<TData>[];
    actions: {
        header: string;
        list: ActionListTableHelper<TData> | undefined;
        width?: string;
    };
    rowStyleCustom?: (item: TData) => React.CSSProperties; 
};

export type TableHelperHook<T> = {
    (action?: ActionListTableHelper<T>['render']): ResultTableHelperHook<T>;
};
