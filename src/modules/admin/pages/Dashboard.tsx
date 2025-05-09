import { DashboardAdminLayout } from "@/core/layouts/DasboardAdminLayout";
import { Outlet } from "react-router-dom";


export const DashboardAdmin = () => {

    return (
        <DashboardAdminLayout>
            <Outlet />
        </DashboardAdminLayout>
    );
};