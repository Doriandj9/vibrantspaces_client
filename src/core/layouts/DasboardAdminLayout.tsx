import { Children } from "@/core/@types/core";
import { HeaderAdmin } from "./partials/HeaderAdmin";
import { useState } from "react";
import { MenuMobileContext, NavbarContext } from "../contexts/LayoutContexs";
import { Navbar } from "./partials/Navbar";




export const DashboardAdminLayout: React.FC<Children> = ({ children }) => {
    const [isNavbarMobile, setIsNavbarMobile] = useState(false);
    const [isMenuMobile, setIsMenuMobile] = useState(false);


    return (
        <>
            <NavbarContext.Provider value={{ isNavbarMobile, changeNavbarMobile: setIsNavbarMobile }}>
                <MenuMobileContext.Provider value={{ isMenuMobile, changeMenuMobile: setIsMenuMobile }}>
                    <div className="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">

                        <aside className="flex-shrink-0 hidden w-64 bg-white border-r dark:border-primary-darker dark:bg-darker md:block">
                            <Navbar />
                        </aside>

                        <div className="flex-1 h-full overflow-x-hidden overflow-y-auto">
                            <HeaderAdmin />
                            <main>
                                {children}
                            </main>
                        </div>
                    </div>
                </MenuMobileContext.Provider>
            </NavbarContext.Provider>
        </>
    );
};