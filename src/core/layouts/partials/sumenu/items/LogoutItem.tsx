import { webRoutes } from "@/config/webRoutes";
import { AppLoading } from "@/core/components/AppLoading";
import { useLogout } from "@/modules/client/hooks/auth/hook";
import { useAuthStore } from "@/store/authStore";
import { Button, MenuItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export const LogoutItem = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();
    const endSession = useAuthStore((state) => state.logout);
    const [t] = useTranslation('client');

    const onLogout = () => {
        logout.mutate(undefined, {
            onSuccess() {
                navigate(webRoutes.home.path);
                endSession();
            }
        });
    };

    return (
        <>
            <AppLoading loading={logout.isPending} />
            <MenuItem value="log-out" asChild>
                <Button variant={'outline'} onClick={() => onLogout()}>
                    <MdLogout /> {t('login.labels.Log Out')}
                </Button>
            </MenuItem>
        </>
    );
};