import { AppInput } from "@/core/components/AppInput";
import { AppLoading } from "@/core/components/AppLoading";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { showError } from "@/core/utilities/errors";
import { AccountChangesForm } from "@/modules/client/hooks/auth/auth";
import { useAccountChangesPut } from "@/modules/client/hooks/auth/hook";
import { useAccountChangesPutSchema } from "@/modules/client/validations/loginSchema";
import { useAuthStore } from "@/store/authStore";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useGetAppSettings, usePutAppSettings } from "../hooks/app/hook";

type ConfigurationModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ConfigurationModal: React.FC<ConfigurationModalProps> = ({ open, setOpen }) => {
    const [t] = useTranslation('client');
    const [t_core] = useTranslation('core');
    const user = useAuthStore((s) => s.user);
    const { put } = useAccountChangesPut(user?.id);
    const {put: putAppSettings} = usePutAppSettings();
    const {data: appSettings } = useGetAppSettings();
    const schema = useAccountChangesPutSchema();
    const { updateToken, updateUser } = useAuthStore((state) => state);

    const { control, handleSubmit, setValue } = useForm<AccountChangesForm>({
        defaultValues: {
            email: user?.email,
            name: user?.name,
            phone_number: appSettings?.phone_number
        },
        resolver: zodResolver(schema)
    });

    const onSaveAccount: SubmitHandler<AccountChangesForm> = (data) => {
        if (data.repeat_password) {
            delete data.repeat_password;
        }

        if(data.phone_number){
            putAppSettings.mutate({phone_number: data.phone_number}, {
                onError(err){
                    showError(err);
                }
            });
            delete data.phone_number;
        }

        put.mutate(data, {
            onSuccess(response) {
                updateToken(response.token, response.time_expired_token);
                updateUser(response.jwt);
                setValue('password', '');
                setValue('repeat_password', '');
                toast.success('Se actualizo correctamente');
                setOpen(false);
            },
            onError(error) {
                showError(error);
            }
        });
    };

    return (
        <>
            <AppLoading loading={put.isPending} />
            <Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>{t_core('app.settings')}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <div className="w-full h-full flex flex-col gap-4">

                                    <div className="">
                                        <h3
                                            className="text-xl font-bold"
                                        >{t('mobile.menu.account-setting')}</h3>

                                        <div className="pb-4 border-b border-gray-300">
                                            <form className="mt-4">
                                                <AppInput
                                                    fullWidth
                                                    className="w-full"
                                                    name="name"
                                                    control={control}
                                                    isRequired

                                                    label={t('form-services-contact.nombres')}
                                                />

                                                <AppInput
                                                    fullWidth
                                                    className="w-full mt-2"
                                                    name="email"
                                                    control={control}
                                                    isRequired
                                                    inputProps={{
                                                        type: 'email'
                                                    }}
                                                    label={t('form-services-contact.correo')}
                                                />
                                                <AppInput
                                                    fullWidth
                                                    className="w-full mt-2"
                                                    name="password"
                                                    control={control}
                                                    inputProps={{
                                                        type: 'password'
                                                    }}
                                                    label={t('login.inputs.password.label')}
                                                />
                                                <AppInput
                                                    fullWidth
                                                    className="w-full mt-2"
                                                    name="repeat_password"
                                                    control={control}
                                                    inputProps={{
                                                        type: 'password'
                                                    }}
                                                    label={t('login.inputs.repeat-password.label')}
                                                />
                                            </form>
                                        </div>

                                    </div>

                                    <div className="">
                                        <h3
                                            className="text-xl font-bold"
                                        >{t('mobile.menu.system')}</h3>

                                        <AppInput
                                            fullWidth
                                            className="w-full mt-2"
                                            name="phone_number"
                                            control={control}
                                            label={t('form-services-contact.número_de_contacto')}
                                        />
                                    </div>
                                </div>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">{t_core('app.regresar')}</Button>
                                </Dialog.ActionTrigger>
                                <ButtonPrimary onClick={handleSubmit(onSaveAccount)}>
                                     {t('login.labels.save-changes')}
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
