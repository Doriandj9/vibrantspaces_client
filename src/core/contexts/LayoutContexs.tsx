
import { createContext } from "react";
import { MenuMobileContextType, NavbarContextType } from "../@types/contexts";

export const NavbarContext = createContext<NavbarContextType>({ isNavbarMobile: false, changeNavbarMobile: () => { } });
export const MenuMobileContext = createContext<MenuMobileContextType>({ isMenuMobile: false, changeMenuMobile: () => { } });