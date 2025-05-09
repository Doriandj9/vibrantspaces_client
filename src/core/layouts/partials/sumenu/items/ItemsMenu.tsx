import { Avatar as CAvatar } from "@chakra-ui/react/avatar";
import { Badge, CloseButton, Drawer, IconButton, Menu, Portal } from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdNotificationsNone, MdOutlineSettings } from "react-icons/md";
import { useState } from "react";
import { LogoutItem } from "./LogoutItem";
import { useLanguageApp } from "@/store/languageStore";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";


export const Notify = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Drawer.Trigger asChild>
                    <IconButton
                        backgroundColor={'blue.100'}
                        position={'relative'}
                        rounded={'full'}
                        _hover={{
                            backgroundColor: 'blue.200'
                        }}
                    >
                        <MdNotificationsNone className="text-blue-700" />
                    </IconButton>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner padding={'4'}>
                        <Drawer.Content rounded={'md'} padding={0}>
                            <Drawer.Header className="flex items-center justify-between">
                                <Drawer.Title>Notificaciones</Drawer.Title>
                                <Drawer.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Drawer.CloseTrigger>
                            </Drawer.Header>
                            <Drawer.Body padding={1}>
                                dd
                            </Drawer.Body>
                            <Drawer.Footer>
                            </Drawer.Footer>

                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>

        </>
    );
};


export const Search = () => {
    const [t, i18n] = useTranslation('core');
    const { language, update } = useLanguageApp((state) => state);

    const handleChangeLang = (lang: 'es' | 'en') => {
        i18n.changeLanguage(lang);
        update(lang);
    };

    return (
        <>


            <Menu.Root>
                <Menu.Trigger asChild>
                    <IconButton
                        backgroundColor={'blue.100'}
                        position={'relative'}
                        rounded={'full'}
                        _hover={{
                            backgroundColor: 'blue.200'
                        }}
                    >
                        <Badge colorPalette={'bg'} bg={'primary.500'}
                            position={'absolute'}
                            top={'-2'}
                            right={'-1.5'}
                            color={'white'}
                        >
                            {language}
                        </Badge>
                        <GrLanguage className="text-blue-700" />

                    </IconButton>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content bg={'secondary.500'} color={'white'}>
                            <Menu.Item value="lang-en"
                                onClick={() => handleChangeLang('en')}
                                color={'white'}
                            >
                                {t('language.English')} (en)
                            </Menu.Item>
                            <Menu.Item value="lang-es"
                                onClick={() => handleChangeLang('es')}
                                color={'white'}
                            >
                                {t('language.Spanish')} (es)
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </>
    );
};



export const Settings = () => {

    return (
        <>
            <IconButton
                backgroundColor={'blue.100'}
                rounded={'full'}
                _hover={{
                    backgroundColor: 'blue.200'
                }}
            >
                <MdOutlineSettings className="text-blue-700" />
            </IconButton>
        </>
    );
};

export const Avatar = () => {

    return (
        <>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <div className="flex items-center cursor-pointer" >
                        <CAvatar.Root>
                            <CAvatar.Fallback name="AD" />
                        </CAvatar.Root>
                        <MdKeyboardArrowDown />
                    </div>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="logout-Item">
                                <LogoutItem />
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>

        </>
    );
};