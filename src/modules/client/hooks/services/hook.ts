import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataServices, getMessage, getService, getServices, getUserService, setPictureService, storeDataServices, storeMessageConfirmation, storeMessageContact } from "./queries";
import { FormDataService, PictureForm, StoreMessageConfirmation, StoreMessageContact } from "./services";


export const useGetServices = () => {
    const hook = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
        refetchInterval: (1000 * 30)
    });

    return { ...hook };
};

export const useGetService = (id?: string | number | null) => {
    const hook = useQuery({
        queryKey: ['services', id],
        queryFn: () => getService(String(id)),
        refetchInterval: (1000 * 30),
        enabled: !!id
    });

    return { ...hook };
};


export const useSetPictureService = (id?: string | number) => {
    const client = useQueryClient();

    const set = useMutation({
        mutationKey: ['set-img', id],
        mutationFn: (data: PictureForm) => setPictureService(String(id), data),
        onSuccess() {
            client.invalidateQueries({ queryKey: ['services'] });
        }
    });
    return { set };
};

export const useStoreDataService = () => {
    const store = useMutation({
        mutationKey: ['store-data-service'],
        mutationFn: (data: FormDataService) => storeDataServices(data)
    });

    return { store };
};


export const useGetUserService = (taxId?: null | string) => {
    const hook = useQuery({
        queryKey: ['user-service', taxId],
        queryFn: () => getUserService(String(taxId)),
        enabled: !!taxId
    });

    return { ...hook };
};


export const useGetDataServices = () => {
    const hook = useQuery({
        queryKey: ['data-services'],
        queryFn: getDataServices,
    });

    return { ...hook };
};

export const useStoreSendConfirmation = () => {
    const client = useQueryClient();
    const store = useMutation({
        mutationKey: ['send-confirmation'],
        mutationFn: (data: StoreMessageConfirmation) => storeMessageConfirmation(data),
        onSuccess(){
            client.invalidateQueries({queryKey: ['data-services']});
        }
    });

    return { store };
};


export const useGetMessages = () => {
    const hook = useQuery({
        queryKey: ['data-messages'],
        queryFn: getMessage,
    });

    return { ...hook };
};

export const useStoreSendMessage = () => {
    const client = useQueryClient();
    const store = useMutation({
        mutationKey: ['send-message'],
        mutationFn: (data: StoreMessageContact) => storeMessageContact(data),
        onSuccess(){
            client.invalidateQueries({queryKey: ['data-messages']});
        }
    });

    return { store };
};