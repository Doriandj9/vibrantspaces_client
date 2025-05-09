import { useQuery } from "@tanstack/react-query";
import { getServices } from "./queries";


export const useGetServices = () => {
    const hook = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
        refetchInterval: (1000 * 30)
    });

    return { ...hook };
};