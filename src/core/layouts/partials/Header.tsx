import logo from '@/assets/img/logo.jpg';
import { ButtonPrimary } from '@/core/components/ButtonPrimary';
import { MenuLanguage } from '@/core/components/MenuLanguage';
import { MenuMobile } from '@/core/components/MenuMobile';
import { Button } from '@chakra-ui/react';
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdLogin } from "react-icons/md";
import { useAuthStore } from '@/store/authStore';
import { webRoutes } from '@/config/webRoutes';
import { TbLayoutDashboard } from "react-icons/tb";

export const HeaderPage = () => {
    const isLogin = useAuthStore((state) => state.isLogin);

    return (
        <>
            <div className="fixed top-5 left-0 w-full flex justify-center items-center z-10">
                <div className="w-11/12 rounded-3xl h-20 p-4 m-auto bg-white shadow-lg">
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <img className='h-16 rounded-full' src={logo} alt="LOGO VIBRANT SPACE" />
                        </div>

                        <div className='w-96 text-slate-800 justify-around gap-2 hidden md:flex'>
                            <Link to={'/'}>
                            Inicio
                            </Link>
                            <button className='flex items-start cursor-pointer'>
                                Servicios
                                <MdKeyboardArrowDown />
                            </button>

                            <Link to={''}>
                                Nosotros
                            </Link>
                            <Link to={''}>
                                Privacidad
                            </Link>
                            <Link to={''}>
                                Condiciones
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
                                    <MdLogin /> Login
                                </Button>
                            </Link>
                            }
                            
                            <ButtonPrimary>
                                <MdOutlinePermPhoneMsg /> Contactanos
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}; 