

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { ButtonPrimary } from "./ButtonPrimary";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { MdPhoneIphone } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AppTextarea } from "./AppTextarea";
export const ContactUs = ({fullWidth}: {fullWidth?: boolean}) => {
    const [t] = useTranslation('core');

    const { control } = useForm();

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <ButtonPrimary width={fullWidth ? 'full' : 'auto'}>
                    <MdOutlinePermPhoneMsg /> {t('app.Contactenos')}
                </ButtonPrimary>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{t('app.Contactenos')}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <div>
                                <h3 className="text-xl text-primary font-semibold font-mono text-center">
                                    Escribenos
                                </h3>
                                <div className="text-xl text-secondary text-center">
                                       <p className="flex items-center pa-2 justify-center">
                                       <MdPhoneIphone className="w-5 h-5" /> <span>+25 988766-23223</span>
                                        </p> 
                                </div>
                                <div className="my-4 flex gap-4 items-center">
                                    <div className="border border-gray-200 w-full" />
                                    <span className="text-gray-400">O</span>
                                    <div className="border border-gray-200 w-full" />

                                </div>
                                <h3 className="text-xl text-primary font-semibold font-mono text-center">
                                    Envianos un mensaje
                                </h3>

                                <div className="">
                                    <AppTextarea
                                    className="w-full"
                                    name="message"
                                    control={control}
                                    label="Mensaje"
                                    fullWidth
                                    />
                                </div>
                               
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">
                                    {t('app.regresar')}
                                </Button>
                            </Dialog.ActionTrigger>
                            <ButtonPrimary>
                                {t('app.Enviar Mensaje')}
                            </ButtonPrimary>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
