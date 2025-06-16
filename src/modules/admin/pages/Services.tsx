import { AppTable } from "@/core/components/AppTable";
import { useGetServices, useSetPictureService } from "@/modules/client/hooks/services/hook";
import { PictureForm, ServiceData } from "@/modules/client/hooks/services/services";
import { IconButton } from "@chakra-ui/react";
import { useTableServicesHelper } from "./TServicesHelper";
import { AiOutlinePicture } from "react-icons/ai";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppFileUpload } from "@/core/components/AppFileUpload";
import { usePictureSchema } from "@/modules/client/validations/pictureSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { toast } from "sonner";
import { AppLoading } from "@/core/components/AppLoading";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export const Services = () => {
    const { data, error, isLoading } = useGetServices();
    const [t] = useTranslation('client');

    const actionFn = (item: ServiceData) => {

        return (
            <>
                <AddPicture service={item} />
            </>
        );
    };

    const tableHelper = useTableServicesHelper(actionFn);

    return (
        <>
            <div className="p-2">
                <div className="flex justify-center sticky top-0 w-full bg-transparent z-10">
                    <span className="container-fluid text-lg font-bold">{t('login.labels.Services')}</span>
                </div>
                <div className="app-container-fade w-full min-h-60 mt-4 p-2 dark:text-white">

                    <AppTable data={data ?? []} error={error} isLoading={isLoading} tableHelper={tableHelper} />
                </div>
            </div>
        </>
    );
};



type AddPictureProps = {
    service: ServiceData;
};

export const AddPicture: React.FC<AddPictureProps> = ({ service }) => {
    const { set } = useSetPictureService(service.id);
    const [open, setOpen] = useState(false);
    const [t] = useTranslation('client');
    const [t_core] = useTranslation('core');
    const schema = usePictureSchema();
    const { control, handleSubmit, reset } = useForm<PictureForm>({
        resolver: zodResolver(schema)
    });

    const onSave: SubmitHandler<PictureForm> = (data) => {
        set.mutate(data, {
            onSuccess() {
                reset({
                    picture: undefined
                });

                setOpen(false);
            }
        });
    };


    return (
        <>
            <AppLoading loading={set.isPending} />
            <Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
                <Dialog.Trigger asChild>
                    <IconButton colorPalette={'green'}>
                        <AiOutlinePicture />
                    </IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>{t('mobile.menu.Cambiar Imagen')}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <AppFileUpload
                                    control={control}
                                    name="picture"
                                    label={t('login.labels.Suba una imagen')}
                                    labelUpload={t("login.labels.Arrastre y suelte aquí para cargar o haga click aquí para buscar")}
                                    accept={'image/*'}
                                    verifyFiles={(file) => {
                                        const maxSizeInMB = 50;
                                        const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // 50 MB

                                        if (!file.type.startsWith("image/")) {
                                            toast.error(t('validations.messages.Solo se pueden subir archivos de imagen'), { position: 'top-center' });
                                            return false;
                                        }

                                        if (file.size > maxSizeInBytes) {
                                            toast.error(t('validations.messages.No se puede subir una imagen que pese más de 50 MB'), { position: 'top-center' });
                                            return false;
                                        }

                                        return true;
                                    }}
                                />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">{t_core('app.regresar')}</Button>
                                </Dialog.ActionTrigger>
                                <ButtonPrimary onClick={handleSubmit(onSave)}>
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


