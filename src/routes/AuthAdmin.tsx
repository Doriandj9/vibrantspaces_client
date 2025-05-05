import { Children } from "@/core/@types/core";
import { useAuthStore } from "@/store/authStore";
import { Outlet } from "react-router-dom";

const AuthAdmin: React.FC<Children> = () => {
    const {isLogin, isAdmin} = useAuthStore((state) => state);

    if(!isLogin || !isAdmin){

        return (
            <>
                <p>No logueador</p>
            </>
        );
    }

    return (
        <>
            <Outlet />
        </>
    );
};


export default AuthAdmin;