import { webRoutes } from "@/config/webRoutes";
import { NavbarContext } from "@/core/contexts/LayoutContexs";
import { AccordionItem, AccordionRoot } from "@chakra-ui/react";
import { useContext } from "react";
import { FiFolderPlus } from "react-icons/fi";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { NavLink } from "react-router-dom";


export const NavbarMobile = () => {
    const { isNavbarMobile } = useContext(NavbarContext);
    return (
        <>
            {
                isNavbarMobile &&
                <div className="border-b md:hidden dark:border-primary-darker">
                    <nav className="px-2 py-4 space-y-2">
                        <AccordionRoot multiple collapsible >
                            <AccordionItem value={'1'}>
                                <NavLink to={webRoutes.admin.children.services.path}
                                    className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item-active' : ''}`}
                                >
                                    <FiFolderPlus className="w-5 h-5" />   Servicios
                                </NavLink>
                            </AccordionItem>
                            <AccordionItem value={'2'}>
                                <NavLink to={webRoutes.admin.children.requests.path}
                                    className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item-active' : ''}`}
                                >
                                    <VscGitPullRequestNewChanges className="w-5 h-5" />   Solicitudes
                                </NavLink>
                            </AccordionItem>
                        </AccordionRoot>
                    </nav>
                </div>
            }
        </>
    );
};