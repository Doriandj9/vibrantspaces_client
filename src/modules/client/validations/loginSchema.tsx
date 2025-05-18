import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';

export type LoginForm = {
    email: string;
    password: string;
};


export const useLoginSchema = () => {
    const [t] =  useTranslation('client');

    const handleSchema = useCallback(() => {
        return z.object({
            email: z.string().email(t('validations.messages.email-type')),
            password: z.string().min(1,t('validations.messages.password-required'))
        });
    },[t]);

    return handleSchema();
};


export const useAccountChangesPutSchema = () => {
    const [t] =  useTranslation('client');

    const handleSchema = useCallback(() => {
        return z.object({
            name: z.string().min(4,t('validations.messages.min-length').replace('{count}','4')),
            email: z.string().email(t('validations.messages.email-type')),
            password: z.string().min(1,t('validations.messages.password-required')).optional(),
            repeat_password: z.string().optional()
        }).refine((data) => data.password === data.repeat_password, {
            message: "Las contraseñas no coinciden",
            path: ['repeat_password']
          });
    },[t]);

    return handleSchema();
};

