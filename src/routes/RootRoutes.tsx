import { Route } from "react-router-dom";
import { CustomRoutes } from "./CustomRoutes";
import { webRoutes } from "@/config/webRoutes";
import MiddlewareLogin from "./MiddlewareLogin";
import AuthPages from "./AuthPages";
import AuthAdmin from "./AuthAdmin";
import { NotFound } from "@/core/components/NotFound";
import { HomePage } from "@/modules/client/pages/Home/HomePage";


const RootRoutes = () => {
  return (
    <>
      <CustomRoutes>
        <Route path={webRoutes.home.path} element={<HomePage />} />
       


        <Route element={<MiddlewareLogin />}>
          {/* <Route path={webRoutes.login.path} element={<Login />} /> */}
          
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
          {/* <Route path={webRoutes.dashboard_admin.path} element={<DashboardAdmin />}>
            <Route element={<StatisticsAdmin />} index/>
            <Route element={<StatisticsAdmin />} path={webRoutes.dashboard_admin.children.statistics.path} />
            <Route element={<Categories />} path={webRoutes.dashboard_admin.children.categories.path} />
            <Route element={<Users />} path={webRoutes.dashboard_admin.children.users.path} />
          </Route> */}
        </Route>

        <Route path="*" element={<NotFound />} />

      </CustomRoutes>
    </>
  );
};

export default RootRoutes;
