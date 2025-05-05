import { ButtonProps } from "@chakra-ui/react";

export type Children = {
    children?: React.ReactNode;
};


export type ButtonPrimaryType = ButtonProps & Children;

export type User ={
    full_name: string;
    rol: {
        name: 'Admin' | 'Client'
    }
};