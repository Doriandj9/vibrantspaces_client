import { useLanguageApp } from "@/store/languageStore";
import { useGetServices } from "../hooks/services/hook";
import { Link } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { appLoadImage } from "@/core/utilities/img/convert";
import { HStack, Skeleton } from "@chakra-ui/react";
import { AppErrorApi } from "@/core/components/AppErrorApi";



export const ServicesShowList = () => {
    const lang = useLanguageApp((state) => state.language);
    const { data: services, isLoading: loadingServices, error: errorServices } = useGetServices();


    return (
        <>
            <div className="flex w-full gap-4 mt-4 flex-wrap justify-center">

                {services?.map((item, index) => (
                    <Link
                        to={webRoutes.home.children.services.path.replace(':name', item.trans.translations[lang].title) + `?i=${item.id}`}>
                        <article className="relative w-96 lg:w-[28rem]  rounded-2xl p-2 h-40">
                            <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full z-30 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold relative text-white">
                                    {item.trans.translations[lang].title}
                                </h3>
                            </div>
                            <div className={`absolute top-0 left-0 w-full h-full ${index % 2 == 0 ? 'bg-primary/50' : 'bg-secondary/50'} rounded-2xl z-20`}>

                            </div>
                            <div className="absolute top-0 left-0 z-10 w-full h-full rounded-2xl">
                                <img src={item.picture ? appLoadImage(item.picture) : 'N/A'}
                                    alt=""
                                    className="w-full h-full rounded-2xl"
                                />
                            </div>
                        </article>
                    </Link>
                ))}



            </div>
            {
                loadingServices &&
                <HStack display={'flex'} gap={4} flexWrap={'wrap'} justifyContent={'center'}>
                    <Skeleton width={'96'} h={'40'} rounded={'2xl'} />
                    <Skeleton width={'96'} h={'40'} rounded={'2xl'} />
                    <Skeleton width={'96'} h={'40'} rounded={'2xl'} />
                    <Skeleton width={'96'} h={'40'} rounded={'2xl'} />
                </HStack>
            }
            {
                errorServices &&

                <>
                    <AppErrorApi error={errorServices} />
                </>
            }
        </>
    );

};