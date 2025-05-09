import { Children } from "../@types/core";
import { Footer } from "./partials/Footer";
import { HeaderPage } from "./partials/Header";




export const AppLayout: React.FC<Children> = ({ children }) => {

    return (
        <>
            <div className="bg-white min-h-screen flex flex-col">
                <HeaderPage />
                <div className="pt-28 text-gray-900 flex-grow">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
};