import { AppTable } from "@/core/components/AppTable";
import { useGetDataServices, useGetMessages, useStoreSendConfirmation } from "@/modules/client/hooks/services/hook";
import { DataServiceModel, NotificationModel, StoreMessageConfirmation } from "@/modules/client/hooks/services/services";
import { useTableDataServicesHelper } from "./TDataServicesHelper";
import { IoEyeOutline } from "react-icons/io5";
import { Button, CloseButton, Dialog, IconButton, List, Popover, Portal } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ScriptEditor } from "../../components/ScriptEditorText";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { toast } from "sonner";
import { useState } from "react";
import { mergeCssHtml } from "@/core/utilities/css";
import { useAuthStore } from "@/store/authStore";
import { showError } from "@/core/utilities/errors";
import { AppLoading } from "@/core/components/AppLoading";
import { LuCircleCheck, LuHistory } from "react-icons/lu";
import { useTableConfirmationsHelper } from "./TConfirmationsHelper";
import { CiViewTable } from "react-icons/ci";
import { useLanguageApp } from "@/store/languageStore";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTableMessagesHelper } from "./TMessagesHelper";


export const DataServicesPage = () => {
    const { data, isLoading, error } = useGetDataServices();
    const {data: messages, isLoading: loadingMs, error: errorMs} = useGetMessages();

    const actionFn = (item: DataServiceModel) => {

        return (
            <>
                <span className="flex gap-2 items-center">
                    <ShowDataModal data={item} />
                    <ShowHistory data={item.confirmations} />
                </span>
            </>
        );
    };

    const tableHelper = useTableDataServicesHelper(actionFn);

    const tableHelperMessage = useTableMessagesHelper();

    return (
        <>
            <div className="p-2">
                <div className="flex justify-center sticky top-0 w-full bg-transparent z-10">
                    <span className="container-fluid text-lg font-bold">Solicitudes de limpieza</span>
                </div>
                <div className="app-container-fade w-full min-h-60 mt-4 p-2">
                    <AppTable data={data ?? []} error={error} isLoading={isLoading} tableHelper={tableHelper} />
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-center sticky top-0 w-full bg-transparent z-10">
                    <span className="container-fluid text-lg font-bold">Solicitudes de contactos</span>
                </div>
                <div className="app-container-fade w-full min-h-60 mt-4 p-2">
                    <AppTable data={messages ?? []} error={errorMs} isLoading={loadingMs} tableHelper={tableHelperMessage} />
                </div>
            </div>
        </>
    );
};


const ShowDataModal = ({ data }: { data: DataServiceModel }) => {
    const [t] = useTranslation('client');
    const [message, setMessage] = useState<null | string>(null);
    const lang = useLanguageApp((s) => s.language);
    const user = useAuthStore((s) => s.user);
    const { store } = useStoreSendConfirmation();
    const [open, setOpen] = useState(false);
    const onSave = () => {
        if (message === '' || !message) {
            toast.error('Registre su mensaje de confirmación', {
                position: 'top-center'
            });
            return;
        }

        const payload = mergeCssHtml(message);
        const dataForm: StoreMessageConfirmation = {
            payload,
            receiver: data.user_id,
            sender: user?.id || 1,
            type: 'HTML',
            data_service_id: data.id
        };

        store.mutate(dataForm, {
            onSuccess() {
                toast.success('Se envió correctamente la notificación');
                setOpen(false);
            },
            onError(err) {
                showError(err);
            }
        });

    };

    return (
        <>
            <AppLoading loading={store.isPending} />
            <Dialog.Root size={'xl'} open={open} onOpenChange={({ open }) => setOpen(open)}>
                <Dialog.Trigger asChild>
                    <IconButton colorPalette={'green'}>
                        <IoEyeOutline />
                    </IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title></Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <div className="">
                                    <h4 className="text-lg font-bold my-2">Datos Formulario: </h4>
                                    <div className="flex gap-6">
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                Servicio vinculado
                                            </h2>
                                            <Popover.Root>
                                                <Popover.Trigger asChild>
                                                    <Button colorPalette={'teal'}>
                                                        <FaExternalLinkAlt /> {data.service.trans.translations[lang].title}
                                                    </Button>
                                                    {/* <p className="font-bold text-secondary underline cursor-pointer flex gap-2 items-center">
                                                       <FaExternalLinkAlt /> {data.service.trans.translations[lang].title}
                                                    </p> */}
                                                </Popover.Trigger>
                                                <Portal>
                                                    <Popover.Positioner>
                                                        <Popover.Content>
                                                            <Popover.Arrow />
                                                            <Popover.Body>
                                                                <Popover.Title fontWeight="medium"></Popover.Title>
                                                                <div className=" relative p-2 text-gray-700">
                                                                    <List.Root gap="2" variant="plain" align="center">
                                                                        {data.service.list?.translations[lang]?.values.map((item, index) => (
                                                                            <List.Item key={index}>
                                                                                <List.Indicator asChild color="green.500">
                                                                                    <LuCircleCheck />
                                                                                </List.Indicator>
                                                                                {item.title}
                                                                            </List.Item>
                                                                        ))}
                                                                    </List.Root>
                                                                </div>
                                                            </Popover.Body>
                                                        </Popover.Content>
                                                    </Popover.Positioner>
                                                </Portal>
                                            </Popover.Root>

                                        </article>
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.preferencia_contacto')}
                                            </h2>
                                            <p className="font-bold text-primary">
                                                {data.type_contact} - {data.user?.contact_number}
                                            </p>
                                        </article>
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.direccion')}
                                            </h2>
                                            <p>
                                                {data.user.address ?? 'N/A'}
                                            </p>
                                        </article>
                                    </div>
                                    <div className="flex gap-4  mt-2">
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.dormitorios')}
                                            </h2>
                                            <p>
                                                {data.rooms ?? 'N/A'}
                                            </p>
                                        </article>
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.baños')}
                                            </h2>
                                            <p>
                                                {data.bathrooms ?? 'N/A'}
                                            </p>
                                        </article>


                                        <article className="border-b border-gray-300 pb-2 flex-grow">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.descripción_área_limpieza')}
                                            </h2>
                                            <p>
                                                {data.description_area}
                                            </p>
                                        </article>
                                    </div>

                                    <h3 className="text-lg font-bold my-2">Datos del Usuario:</h3>
                                    <div className="flex gap-2 justify-between">
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.nombres')}
                                            </h2>
                                            <p>
                                                {data.user.name ?? 'N/A'}
                                            </p>
                                        </article>
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.direccion')}
                                            </h2>
                                            <p>
                                                {data.user.address ?? 'N/A'}
                                            </p>
                                        </article>
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('form-services-contact.número_de_contacto')}
                                            </h2>
                                            <p>
                                                {data.user.contact_number ?? 'N/A'}
                                            </p>
                                        </article>
                                        <article className="border-b border-gray-300 pb-2">
                                            <h2 className="font-bold">
                                                {t('login.inputs.email.label')}
                                            </h2>
                                            <p>
                                                {data.user.email ?? 'N/A'}
                                            </p>
                                        </article>
                                    </div>
                                    <div className="mt-2">
                                        <h2 className="text-center font-bold text-xl">Notificar Confirmación</h2>
                                    </div>
                                    <div className="flex justify-center">
                                        <ScriptEditor
                                            render={(text) => {
                                                setMessage(text);
                                                return null;
                                            }}
                                        />

                                    </div>
                                </div>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Regresar</Button>
                                </Dialog.ActionTrigger>
                                <ButtonPrimary onClick={onSave} id="btn-sn">
                                    Enviar
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




const ShowHistory = ({ data }: { data: NotificationModel[] }) => {
    const [open, setOpen] = useState(false);

    const actionFn = (item: NotificationModel) => {

        return (
            <>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <IconButton colorPalette={'teal'}>
                            <CiViewTable />
                        </IconButton>
                    </Popover.Trigger>
                    <Portal>
                        <Popover.Positioner>
                            <Popover.Content>
                                <Popover.Arrow />
                                <Popover.Body>
                                    <Popover.Title fontWeight="medium">Contenido</Popover.Title>
                                    <div className="max-w-full">
                                        <div dangerouslySetInnerHTML={{ __html: item.payload }} />

                                    </div>
                                </Popover.Body>
                            </Popover.Content>
                        </Popover.Positioner>
                    </Portal>
                </Popover.Root>
            </>
        );
    };

    const tableHelper = useTableConfirmationsHelper(actionFn);

    return (
        <>
            <Dialog.Root size={'lg'} open={open} onOpenChange={({ open }) => setOpen(open)}>
                <Dialog.Trigger asChild>
                    <IconButton colorPalette={'blue'}>
                        <LuHistory />
                    </IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Contenido</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <div>
                                    <div className="p-2">
                                        <div className="flex justify-center sticky top-0 w-full bg-transparent z-10">
                                            <span className="container-fluid text-lg font-bold">Notificaciones de servicio enviadas</span>
                                        </div>
                                        <div className="app-container-fade w-full min-h-60 mt-4 p-2">
                                            <AppTable data={data ?? []} error={null} isLoading={false} tableHelper={tableHelper} />
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Regresar</Button>
                                </Dialog.ActionTrigger>
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


