
import { DescriptionUser } from "@/core/components/DescriptionUser";
import { NavLink } from "react-router-dom";
import { FiFolderPlus } from "react-icons/fi";
import { webRoutes } from "@/config/webRoutes";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

export const Navbar = () => {


    return (
        <div className="flex flex-col h-full">
            <div className="p-2">
                <DescriptionUser />
            </div>
            <div>
                <h3 className="text-sm font-bold mt-2 ps-2">Menu</h3>
            </div>
            <nav className="p-2">
                <ul className="flex flex-col gap-2">
                    <li>
                        <NavLink to={webRoutes.admin.children.services.path}
                        className={({ isActive }) => `navbar-item ${ isActive ? 'navbar-item-active' : ''}`}
                        >
                         <FiFolderPlus className="w-5 h-5" />   Servicios
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={webRoutes.admin.children.requests.path}
                        className={({ isActive }) => `navbar-item ${ isActive ? 'navbar-item-active' : ''}`}
                        >
                         <VscGitPullRequestNewChanges className="w-5 h-5" />   Solicitudes
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div >
    );
};