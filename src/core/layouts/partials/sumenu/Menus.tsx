
import { useContext } from "react";
import { MenuMobileContext } from "@/core/contexts/LayoutContexs";
import { Search, Avatar } from "./items/ItemsMenu";
import { Button } from "@chakra-ui/react";
import { TbWorldWww } from "react-icons/tb";
import { Link } from "react-router-dom";

export const MenuWeb = () => {

    return (
        <>
            <nav className="hidden space-x-2 md:flex md:items-center">
                {/* <Notify /> */}
                <Link to={'/'}>
                    <Button colorPalette={'bg'} bg={'primary.500'} size={'xs'}>
                        <TbWorldWww /> Home Page
                    </Button>
                </Link>
                <Search />
                {/* <Settings /> */}
                <Avatar />
            </nav>
        </>
    );
};


export const MenuMobile = () => {
    const { isMenuMobile } = useContext(MenuMobileContext);

    return (
        <>
            {
                isMenuMobile &&
                <nav className="absolute flex items-center p-4 bg-white rounded-md shadow-lg dark:bg-darker top-16 inset-x-4 md:hidden z-30">
                    <div className="space-x-2">
                        {/* <Notify /> */}
                        <Search />
                        {/* <Settings /> */}
                    </div>
                    <div className="relative ml-auto">
                        <Avatar />
                    </div>
                </nav>
            }
        </>
    );
};