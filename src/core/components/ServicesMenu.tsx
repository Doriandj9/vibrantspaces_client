import { webRoutes } from "@/config/webRoutes";
import { useGetServices } from "@/modules/client/hooks/services/hook";
import { useLanguageApp } from "@/store/languageStore";
import { Menu, Portal } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";



export const ServicesMenu = () => {
    const {data} = useGetServices();
    const [t] = useTranslation('core');
    const lang = useLanguageApp((state) => state.language);

    return (
        <>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <button className='flex items-start cursor-pointer'>
                        {t('app.Services')}
                        <MdKeyboardArrowDown />
                    </button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content min-h={'60'}>
                            {data?.map((item) => (
                                <div className="">
                                    <Link 
                                    to={webRoutes.home.children.services.uri().replace(':name', item.trans.translations[lang].title) + `?i=${item.id}`}
                                    className="block p-2 item-link"
                                    >
                                        { item.trans.translations[lang].title }
                                    </Link>
                                </div>
                            )) }
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </>
    );
};