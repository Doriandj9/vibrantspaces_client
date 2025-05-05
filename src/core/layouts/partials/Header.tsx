import logo from '@/assets/img/logo.jpg';
import { ButtonPrimary } from '@/core/components/ButtonPrimary';
import { MenuLanguage } from '@/core/components/MenuLanguage';
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';

export const HeaderPage = () => {

    return (
        <>
            <div className="fixed top-5 left-0 w-full flex justify-center items-center">
                <div className="w-11/12 bg-glass rounded-3xl h-20 p-4 m-auto">
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <img className='h-16 rounded-full' src={logo} alt="LOGO VIBRANT SPACE" />
                        </div>
                        <div className='flex w-96 text-slate-300 justify-around gap-2'>
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
                        <div className='flex items-center gap-2'>
                            <MenuLanguage />
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