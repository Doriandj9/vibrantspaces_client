import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getService, getServices, setPictureService } from "./queries";
import { PictureForm } from "./services";


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
    const client= useQueryClient();

    const set = useMutation({
        mutationKey: ['set-img', id],
        mutationFn: (data: PictureForm) => setPictureService(String(id),data),
        onSuccess(){
            client.invalidateQueries({queryKey: ['services']});
        }
    });
    return {set};
};