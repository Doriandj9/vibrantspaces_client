

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { ButtonPrimary } from "./ButtonPrimary";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { MdPhoneIphone } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppTextarea } from "./AppTextarea";
import { AppInput } from "./AppInput";
import { useStoreSendMessage } from "@/modules/client/hooks/services/hook";
import { StoreMessageContact } from "@/modules/client/hooks/services/services";
import { useSendMessageSchema } from "@/modules/client/validations/servicesDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppLoading } from "./AppLoading";
import { toast } from "sonner";
import { useState } from "react";
import { app } from "@/config/app";
import { useGetAppSettings } from "@/modules/admin/hooks/app/hook";
export const ContactUs = ({ fullWidth }: { fullWidth?: boolean }) => {
    const [t] = useTranslation('core');
    const [t_client] = useTranslation('client');
    const { store } = useStoreSendMessage();
    const schema = useSendMessageSchema();
    const [open, setOpen] = useState(false);
    const {data, error} = useGetAppSettings();

    const { control, handleSubmit, reset } = useForm<StoreMessageContact>({
        resolver: zodResolver(schema),
        defaultValues: {
            doc_type: 'MS',
            receiver: '1',
            type: 'TXT'
        }
    });


    const onSave: SubmitHandler<StoreMessageContact> = (data) => {
        store.mutate(data, {
            onSuccess(){
                toast.success(t('app.success-message'),{position: 'top-center',duration: 5000});
                setOpen(false);
                reset({
                    doc_type: 'MS',
                    email: '',
                    payload: '',
                    receiver: '1',
                    type: 'TXT'
                });
            }
        });
    };

    return (
        <>
            <AppLoading loading={store.isPending} />
            <Dialog.Root open={open} onOpenChange={({open}) => setOpen(open)}>
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

                                    </h3>
                                    <div className="text-xl text-secondary text-center">
                                        <p className="flex items-center pa-2 justify-center">
                                            <MdPhoneIphone className="w-5 h-5" /> <span>{data?.phone_number ?? app.phoneNumber}</span>
                                        {error ? <span>{error.message}</span> : null}
                                        </p>
                                    </div>
                                    <div className="my-4 flex gap-4 items-center">
                                        <div className="border border-gray-200 w-full" />
                                        <span className="text-gray-400">{t_client('login.labels.or').toUpperCase()}</span>
                                        <div className="border border-gray-200 w-full" />

                                    </div>
                                    <h3 className="text-xl text-primary font-semibold font-mono text-center">
                                        {t_client('login.labels.writing')}
                                    </h3>

                                    <div className="">
                                        <AppTextarea
                                            className="w-full"
                                            name="payload"
                                            isRequired
                                            control={control}
                                            label={t_client('login.inputs.message.label')}
                                            fullWidth
                                        />
                                        <AppInput
                                            className="mt-2 w-full"
                                            name="email"
                                            isRequired
                                            control={control}
                                            fullWidth
                                            label={t_client('login.inputs.email.placeholder')}
                                            inputProps={{
                                                type: 'email'
                                            }}
                                        />

                                        <AppInput
                                            className="mt-2 w-full"
                                            name="phone_number"
                                            control={control}
                                            isRequired
                                            fullWidth
                                            label={t_client('login.labels.contact-number')}
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
                                <ButtonPrimary onClick={handleSubmit(onSave)}>
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
        </>

    );
};
