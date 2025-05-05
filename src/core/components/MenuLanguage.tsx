import { useLanguageApp } from "@/store/languageStore";
import { Badge, IconButton, Menu, Portal } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";


export const MenuLanguage = () => {
    const [t, i18n] = useTranslation('core');
    const {language, update} = useLanguageApp((state) => state);

    const handleChangeLang = (lang: 'es' | 'en') => {
        i18n.changeLanguage(lang);
        update(lang);
    };

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <IconButton position={'relative'}>
                    <Badge colorPalette={'bg'} bg={'secondary.500'}
                        position={'absolute'}
                        top={'-3.5'}
                        right={'-1.5'}
                        color={'white'}
                    >
                        {language}
                    </Badge>
                    <GrLanguage />
                </IconButton>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content bg={'gray.800'} color={'white'}>
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
    );
};