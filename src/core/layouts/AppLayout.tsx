import { Children } from "../@types/core";
import { HeaderPage } from "./partials/Header";




export const AppLayout: React.FC<Children> = ({ children }) => {

    return (
        <>
            <div className="bg-gray-900 min-h-screen">
                <HeaderPage />
                <div className="w-11/12 m-auto pt-28 text-white">
                    {children}
                </div>
            </div>
        </>
    );
};