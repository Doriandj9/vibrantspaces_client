import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from "zod";


export const useServicesDataSchema = () => {
    const [t] = useTranslation('client');
    const handleSchema = useCallback(() => {
        return z.object({
            name: z.string({ message: t('validations.messages.Ingrese su nombre') }).min(3, t('validations.messages.min-length').replace('{count}', '3')),
            contact_number: z.string({ message: t('validations.messages.Ingrese su numero de contacto') }).min(5, t('validations.messages.min-length').replace('{count}', '5')),
            email: z.string({ message: t('validations.messages.email-required') }).email(t('validations.messages.email-required')),
            address: z.string({ message: t('validations.messages.Ingrese su dirección') }).min(5, t('validations.messages.min-length').replace('{count}', '5')),
            type_contact: z.string({ message: t('validations.messages.Seleccione su forma de contacto') }).min(1, t('validations.messages.min-length').replace('{count}', '1')),
            description_area: z.string({ message: t('validations.messages.Ingrese la descripción de su area de limpieza') })
                .min(8, t('validations.messages.min-length').replace('{count}', '8'))
                .max(120, t('validations.messages.max-length').replace('{count}', '120')),
            bathrooms: z.union([z.string({ message: t('validations.messages.Es un campo requerido') }).regex(/^\d+$/, 'No es un numero valido').min(0, 'No puede ser un numero negativo'), z.number({ message: t('validations.messages.Es un campo requerido') })]).optional(),
            rooms: z.union([z.string({ message: t('validations.messages.Es un campo requerido') }).regex(/^\d+$/, 'No es un numero valido').min(0, 'No puede ser un numero negativo'), z.number({ message: t('validations.messages.Es un campo requerido') })]).optional(),
            services_id: z.union([z.string(), z.number()])
        });
    }, [t]);

    return handleSchema();
};


export const useConfirmationRequest = () => {
    const [t] = useTranslation('client');
    const handleSchema = useCallback(() => {
        return z.object({
            payload: z.string({ message: t('validations.messages.Ingrese su mensaje') }).min(3, t('validations.messages.min-length').replace('{count}', '3')),
            type: z.string(),
            sender: z.union([z.string(), z.number()]),
            receiver: z.union([z.string(), z.number()]),
        });
    }, [t]);

    return handleSchema();
};


export const useSendMessageSchema = () => {
    const [t] = useTranslation('client');
    const handleSchema = useCallback(() => {
        return z.object({
            payload: z.string({ message: t('validations.messages.Ingrese su mensaje') }).min(3, t('validations.messages.min-length').replace('{count}', '3')),
            type: z.literal('TXT'),
            receiver: z.literal('1'),
            doc_type: z.literal('MS'),
            email: z.string().email(t('validations.messages.email-type')),
        });
    }, [t]);

    return handleSchema();
};