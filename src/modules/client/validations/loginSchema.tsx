import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';

export type LoginForm = {
    email: string;
    password: string;
};


export type ForgotPasswordForm = {
    email: string;
    password: string;
    repeat_password: string;
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

export const useEmailSchema = () => {
    const [t] =  useTranslation('client');

    const handleSchema = useCallback(() => {
        return z.object({
            email: z.string().email(t('validations.messages.email-type')),
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
            repeat_password: z.string().optional(),
            phone_number: z.string().optional()
        }).partial({
            password: true,
            repeat_password: true,
            phone_number: true
        })
        .refine((data) => data.password === data.repeat_password, {
            message: t('validations.messages.Las contraseñas no coinciden'),
            path: ['repeat_password']
          });
    },[t]);

    return handleSchema();
};


export const useResetPassword = () => {
    const [t] =  useTranslation('client');

    const handleSchema = useCallback(() => {
        return z.object({
            email: z.string().email(t('validations.messages.email-type')),
            password: z.string().min(1,t('validations.messages.password-required')),
            repeat_password: z.string().optional(),
        }).partial({
            repeat_password: true,
        })
        .refine((data) => data.password === data.repeat_password, {
            message: t('validations.messages.Las contraseñas no coinciden'),
            path: ['repeat_password']
          });
    },[t]);

    return handleSchema();
};

