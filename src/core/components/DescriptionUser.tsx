
import { useAuthStore } from "@/store/authStore";
import { LuUser } from "react-icons/lu";
import { LuBox } from "react-icons/lu";
import { LuShield } from "react-icons/lu";

export const DescriptionUser = () => {
    const user = useAuthStore((state) => state.user);

    
    return (
        <div className="">
            <h3 className="text-sm font-bold my-2">Información</h3>
            <ul>
                <li className="flex items-center gap-1 mt-1">
                    <LuUser  className="text-blue-500 flex-shrink-0" /> 
                    <span className="text-sm font-semibold">
                    {user?.name}
                    </span>
                </li>
                <li className="flex items-center gap-1 mt-1">
                    <LuBox  className="text-blue-500 flex-shrink-0" /> 
                    <span className="text-sm font-semibold">
                    EEUU
                    </span>
                </li>
                <li className="flex items-center gap-1 mt-1">
                    <LuShield  className="text-blue-500 flex-shrink-0" /> 
                    <span className="text-sm font-semibold">
                    {user?.rol.name}
                    </span>
                </li>
            </ul>
        </div>
    );
};