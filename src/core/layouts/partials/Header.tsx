import logo from '@/assets/img/logo.jpg';
import { MenuLanguage } from '@/core/components/MenuLanguage';
import { MenuMobile } from '@/core/components/MenuMobile';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdLogin } from "react-icons/md";
import { useAuthStore } from '@/store/authStore';
import { webRoutes } from '@/config/webRoutes';
import { TbLayoutDashboard } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import { ServicesMenu } from '@/core/components/ServicesMenu';
import { ContactUs } from '@/core/components/ContacUs';

export const HeaderPage = () => {
    const isLogin = useAuthStore((state) => state.isLogin);
    const [t] = useTranslation('core');

    return (
        <>
            <div className="fixed top-5 left-0 w-full flex justify-center items-center z-[90]">
                <div className="w-11/12 rounded-3xl h-20 p-4 m-auto bg-white shadow-lg">
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <Link to={'/'}>
                            <img className='h-16 rounded-full' src={logo} alt="LOGO VIBRANT SPACE" />
                            </Link>
                        </div>

                        <div className='w-96 text-slate-800 justify-around gap-2 hidden md:flex'>
                            <Link to={'/'}>
                                {t('app.Home')}
                            </Link>
                            <ServicesMenu />
                            <Link to={webRoutes.privacy.path}>
                                {t('app.Privacidad')}
                            </Link>

                        </div>

                        <div className='flex md:hidden gap-2 items-center'>
                            <MenuLanguage />
                            <MenuMobile />
                        </div>

                        <div className='hidden md:flex items-center gap-2'>
                            <MenuLanguage />
                            {
                                isLogin ? 
                                <Link to={webRoutes.admin.path}>
                                    <Button colorPalette={'blue'}>
                                     <TbLayoutDashboard /> Dashboard
                                    </Button>
                                </Link>
                                :
                                <Link to={'/auth/login'}>
                                <Button colorPalette={'bg'} bg={'ternary.500'}>
                                    <MdLogin /> {t('app.Iniciar Session')}
                                </Button>
                            </Link>
                            }
                            
                            <ContactUs />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}; 