import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineMoreVert } from "react-icons/md";
import { useContext } from "react";
import { MenuMobileContext, NavbarContext } from "@/core/contexts/LayoutContexs";
import { Link } from "react-router-dom";
import { MenuMobile, MenuWeb } from "./sumenu/Menus";
import { NavbarMobile } from "./NavbarMobile";

export const HeaderAdmin = () => {
    const changeMenuMobile = useContext(MenuMobileContext).changeMenuMobile;
    const changeNavbarMobile = useContext(NavbarContext).changeNavbarMobile;

    const handleMenu  = () => {
        changeNavbarMobile(false);
        changeMenuMobile((state) => !state);
    };
    const handleNavbar  = () => {
        changeMenuMobile(false);
        changeNavbarMobile((state) => !state);
    };

    return (
        <>
            <header className="relative bg-white dark:bg-darker">
                <div className="flex items-center justify-between p-2 border-b dark:border-primary-darker">

                    <button
                    onClick={() => handleNavbar()}
                    className="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark md:hidden focus:outline-none focus:ring">
                        <MdOutlineMenu className="text-2xl" />
                    </button>

                    <Link to={'/admin'} className={'inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark dark:text-light'}>
                        <span
                        className="text-sm md:text-3xl select-none"
                        >Vibrant Essences LLC</span>
                    </Link>

                    <button className="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark md:hidden focus:outline-none focus:ring">
                        <MdOutlineMoreVert 
                        onClick={() => handleMenu()}
                        className="text-2xl" />
                    </button>

                    <MenuMobile />
                    <MenuWeb />

                </div>

                <NavbarMobile />
            </header>
        </>
    );
};