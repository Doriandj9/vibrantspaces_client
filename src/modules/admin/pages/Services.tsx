import { AppTable } from "@/core/components/AppTable";
import { useGetServices } from "@/modules/client/hooks/services/hook";
import { ServiceData } from "@/modules/client/hooks/services/services";
import { IconButton } from "@chakra-ui/react";
import { useTableServicesHelper } from "./TServicesHelper";
import { AiOutlinePicture } from "react-icons/ai";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AppFileUpload } from "@/core/components/AppFileUpload";


export const Services = () => {
    const { data, error, isLoading } = useGetServices();

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
                    <span className="container-fluid text-lg font-bold">Servicios</span>
                </div>
                <div className="app-container-fade w-full min-h-60 mt-4">

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

    const {control, watch} = useForm();
    console.log(watch());
    return (
        <Dialog.Root>
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
                            <Dialog.Title>Cambiar Imagen</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <AppFileUpload
                            control={control}
                            name="file"
                            label="Cambio"
                            
                            />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Save</Button>
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