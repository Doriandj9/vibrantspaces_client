import { AppTable } from "@/core/components/AppTable";
import { useGetDataServices, useGetMessages } from "@/modules/client/hooks/services/hook";
import { DataServiceModel, NotificationModel } from "@/modules/client/hooks/services/services";
import { useTableDataServicesHelper } from "./TDataServicesHelper";

import { Button, CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { toast } from "sonner";
import { useState } from "react";

import { showError } from "@/core/utilities/errors";
import { AppLoading } from "@/core/components/AppLoading";

import { useTableMessagesHelper } from "./TMessagesHelper";
import { usePutNotification, usePutServiceData } from "../../hooks/notiifcation/hook";
import { LuArchiveRestore } from "react-icons/lu";

export const TrashPage = () => {
    const { data, isLoading, error } = useGetDataServices({ doc_status: 'DL' });
    const { data: messages, isLoading: loadingMs, error: errorMs } = useGetMessages({ doc_status: 'DL' });
    const [t] = useTranslation('client');
    const actionFn = (item: DataServiceModel) => {

        return (
            <>
                <span className="flex gap-2 items-center">

                    <TrashActionDataService item={item} />
                </span>
            </>
        );
    };

    const tableHelper = useTableDataServicesHelper(actionFn);

    const actionMessagesFn = (item: NotificationModel) => {

        return (
            <>
                <span className="flex gap-2 items-center">
                    <TrashAction item={item} />
                </span>
            </>
        );
    };

    const tableHelperMessage = useTableMessagesHelper(actionMessagesFn);

    return (
        <>
            <div className="p-2">
                <div className="flex justify-center sticky top-0 w-full bg-transparent z-10">
                    <span className="container-fluid text-lg font-bold">{t('login.labels.Cleaning requests')}</span>
                </div>
                <div className="app-container-fade w-full min-h-60 mt-4 p-2 dark:text-white">
                    <AppTable data={data ?? []} error={error} isLoading={isLoading} tableHelper={tableHelper} />
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-center sticky top-0 w-full bg-transparent z-10">
                    <span className="container-fluid text-lg font-bold">{t('login.labels.Contact requests')}</span>
                </div>
                <div className="app-container-fade w-full min-h-60 mt-4 p-2 dark:text-white">
                    <AppTable data={messages ?? []} error={errorMs} isLoading={loadingMs} tableHelper={tableHelperMessage} />
                </div>
            </div>
        </>
    );
};




export const TrashAction = ({ item }: { item: NotificationModel }) => {
    const [t] = useTranslation('client');
    const [t_core] = useTranslation('core');
    const [open, setOpen] = useState(false);
    const { put } = usePutNotification(String(item.id));

    const onChange = () => {
        const data: Partial<NotificationModel> = { doc_status: 'AC' };
        put.mutate(data, {
            onSuccess() {
                toast.success(t('login.labels.changes'));
                setOpen(false);
            },
            onError(err) {
                showError(err);
            }
        });
    };
    return (
        <>
            <AppLoading loading={put.isPending} />
            <Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
                <Dialog.Trigger asChild>
                    <IconButton colorPalette={'green'}>
                        <LuArchiveRestore />
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
                                <p className="font-bold text-lg text-center">
                                    {t('login.labels.Are you sure to continue?')}
                                </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">{t_core('app.regresar')}</Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    colorPalette={'red'}
                                    onClick={onChange}
                                >{t('login.labels.save-changes')}</Button>
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



export const TrashActionDataService = ({ item }: { item: DataServiceModel }) => {
    const [t] = useTranslation('client');
    const [t_core] = useTranslation('core');
    const [open, setOpen] = useState(false);
    const { put } = usePutServiceData(String(item.id));

    const onChange = () => {
        const data: Partial<DataServiceModel> = { doc_status: 'AC' };
        put.mutate(data, {
            onSuccess() {
                toast.success(t('login.labels.changes'));
                setOpen(false);
            },
            onError(err) {
                showError(err);
            }
        });
    };
    return (
        <>
            <AppLoading loading={put.isPending} />
            <Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
                <Dialog.Trigger asChild>
                    <IconButton colorPalette={'green'}>
                        <LuArchiveRestore />
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
                                <p className="font-bold text-lg text-center">
                                    {t('login.labels.Are you sure to continue?')}
                                </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">{t_core('app.regresar')}</Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    colorPalette={'red'}
                                    onClick={onChange}
                                >{t('login.labels.save-changes')}</Button>
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