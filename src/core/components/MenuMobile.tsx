import { Accordion, Button, IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { MdLogin } from "react-icons/md";
import { ContactUs } from "./ContacUs";
import { webRoutes } from "@/config/webRoutes";
import { TbLayoutDashboard } from "react-icons/tb";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";
import { useGetServices } from "@/modules/client/hooks/services/hook";
import { useLanguageApp } from "@/store/languageStore";

export const MenuMobile = () => {
    const isLogin = useAuthStore((s) => s.isAdmin);
    const [t] = useTranslation('core');

    return (
        <>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <IconButton bg={'white'} color={'black'} size={'2xl'}>
                        <LuMenu />
                    </IconButton>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content width={'80'}>
                            <Menu.Item value="home" fontSize={'xl'} asChild
                                borderBottom={'1px solid'}
                                borderColor={'gray.200'}
                                py={'4'}
                                fontWeight={''}
                            >
                                <Link to={'/'}>
                                    <AiOutlineHome /> {t('app.Home')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item value="new-txt" asChild
                            >
                                <ServicesOptions />
                            </Menu.Item>
                            <Menu.Item value="dashboard">
                                <div className="w-full">
                                    {
                                        isLogin ?
                                            <Link to={webRoutes.admin.path}>
                                                <Button width={'full'} colorPalette={'blue'}>
                                                    <TbLayoutDashboard /> Dashboard
                                                </Button>
                                            </Link>
                                            :
                                            <Link to={'/auth/login'}>
                                                <Button width={'full'} colorPalette={'bg'} bg={'ternary.500'}>
                                                    <MdLogin /> {t('app.Iniciar Session')}
                                                </Button>
                                            </Link>
                                    }

                                </div>
                            </Menu.Item>
                            <Menu.Item value="contact" mt={'1'} color={'white'} asChild>
                                <div className="mt-2">
                                    <ContactUs fullWidth />
                                </div>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </>
    );
};


const ServicesOptions = () => {
    const { data } = useGetServices();
    const [t_client] = useTranslation('client');
    
    const lang = useLanguageApp((state) => state.language);
    return (
        <>
            <Accordion.Root collapsible border={'none'}>
                <Accordion.Item value={'servicios'}
                    border={'none'}
                >
                    <Accordion.ItemTrigger
                        pl={'2'}
                        borderBottom={'1px solid'}
                        borderColor={'gray.200'}
                        fontSize={'lg'}
                    >
                        <PiSuitcaseSimpleBold /> {t_client('login.labels.Services')}
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody pl={'6'}>
                            {data?.map((item) => (
                                <div key={item.id} className="">
                                    <Link
                                        to={webRoutes.home.children.services.uri().replace(':name', item.trans.translations[lang].title) + `?i=${item.id}`}
                                        className="block p-2 item-link"
                                    >
                                        {item.trans.translations[lang].title}
                                    </Link>
                                </div>
                            ))}
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </>
    );
};