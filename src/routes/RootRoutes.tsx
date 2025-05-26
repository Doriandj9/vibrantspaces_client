import { Route } from "react-router-dom";
import { CustomRoutes } from "./CustomRoutes";
import { webRoutes } from "@/config/webRoutes";
import MiddlewareLogin from "./MiddlewareLogin";
import AuthPages from "./AuthPages";
import AuthAdmin from "./AuthAdmin";
import { NotFound } from "@/core/components/NotFound";
import { HomePage } from "@/modules/client/pages/Home/HomePage";
import { Login } from "@/modules/client/pages/Home/LoginApp";
import { DashboardAdmin } from "@/modules/admin/pages/Dashboard";
import { HomeAdmin } from "@/modules/admin/pages/Home";
import { Services } from "@/modules/admin/pages/Services";
import { ServicesPage } from "@/modules/client/pages/Home/ServicesPage";
import { DataServicesPage } from "@/modules/admin/pages/DataServices/DataServices";
import { Privacy } from "@/modules/client/pages/Home/Privacy";
import { TrashPage } from "@/modules/admin/pages/Trash/Trashpage";


const RootRoutes = () => {
  return (
    <>
      <CustomRoutes>
        <Route path={webRoutes.home.path} element={<HomePage />} />
        <Route path={webRoutes.privacy.path} element={<Privacy />} />
        <Route path={webRoutes.home.children.services.path} element={<ServicesPage />} />




        <Route element={<MiddlewareLogin />}>
          <Route path={webRoutes.login.path} element={<Login />} />
        </Route>

        <Route element={<AuthPages />}>
          {/* <Route path={webRoutes.config_user.path} element={<Configuration />} >
            <Route index element={<Account />} />
            <Route path={webRoutes.config_user.children.account.path} index element={<Account />} />
            <Route path={webRoutes.config_user.children.password.path} index element={<Password />} />
            <Route path={webRoutes.config_user.children.profile.path} element={<Profile />} />
            <Route path={webRoutes.config_user.children.privacy_security.path} element={<Security />} />
          </Route> */}
        </Route>

        {/* routes for admin */}

        <Route element={<AuthAdmin />}>
          <Route path={webRoutes.admin.path} element={<DashboardAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path={webRoutes.admin.children.home.path} element={<HomeAdmin />} />
            <Route path={webRoutes.admin.children.services.path} element={<Services />} />
            <Route path={webRoutes.admin.children.requests.path} element={<DataServicesPage />} />
            <Route path={webRoutes.admin.children.trash.path} element={<TrashPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

      </CustomRoutes>
    </>
  );
};

export default RootRoutes;
