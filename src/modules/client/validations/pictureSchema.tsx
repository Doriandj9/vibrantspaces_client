import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as z from 'zod';


export const usePictureSchema = () => {
    const [t] =  useTranslation('client');

    const handleSchema = useCallback(() => {
        return z.object({
            picture: z.instanceof(File) 
        });
    },[t]);

    return handleSchema();
};