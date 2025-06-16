import { AppLayout } from "@/core/layouts/AppLayout";
import logo from '@/assets/img/logo-g.png';
import { SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "@/core/components/AppInput";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { useTranslation } from "react-i18next";
import { useResetPassword } from "../../validations/loginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLoading } from "@/core/components/AppLoading";
import { useChangePassword, useVerifyTokenChangePassword } from "../../hooks/auth/hook";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { showError } from "@/core/utilities/errors";
import { NotFound } from "@/core/components/NotFound";
import { ResetPasswordForm } from "../../hooks/auth/auth";
import { useEffect } from "react";

export const ChangePassword = () => {
    const [t] = useTranslation('client');
    const schema = useResetPassword();
    const url = new URL(location.href);
    const token = url.searchParams.get('t');
    const { data, error, isLoading } = useVerifyTokenChangePassword({ token: token ?? '' });
    const { change } = useChangePassword();
    const { control, handleSubmit, reset, setValue } = useForm<ResetPasswordForm>({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate();


    const onLogin: SubmitHandler<ResetPasswordForm> = (data) => {
        if(data.repeat_password){
            delete data.repeat_password;
        }

        change.mutate(data, {
            onSuccess() {
                toast.success(t('validations.messages.update-password'));
                reset({ email: '' });
                navigate(webRoutes.login.path);
            },
            onError(error) {
                showError(error);
            },
        });
    };

    useEffect(() => {
        if(data){
            setValue('email', data.email);
        }
    },[data]);

    if (error) {
        return <NotFound />;
    }

    return (
        <>
            <AppLoading loading={change.isPending || isLoading} />
            <AppLayout>
                <div className="flex justify-center items-center">

                    <div className="min-h-96 relative">
                        <div className="w-96 border border-primary rounded-xl min-h-96">
                            <div className="absolute -top-14 left-0">
                                <img src={logo} alt="" className="" />
                            </div>
                            <form onSubmit={handleSubmit(onLogin)}>

                                <div className="border-t border-gray-200 mt-52 w-full flex justify-center items-center px-4 flex-col gap-2">
                                    <AppInput
                                        className="w-full mt-4"
                                        name="email"
                                        fullWidth
                                        isRequired
                                        inputProps={{
                                            disabled: true,
                                        }}
                                        control={control}
                                        label={t('login.inputs.email.placeholder')}
                                    />

                                    <AppInput
                                        isRequired
                                        className="w-full mt-2"
                                        name="password"
                                        fullWidth
                                        control={control}
                                        inputProps={{
                                            type: 'password'
                                        }}
                                        label={t('login.inputs.password.label')}
                                    />
                                    <AppInput
                                        className="w-full mt-2"
                                        name="repeat_password"
                                        fullWidth
                                        control={control}
                                        inputProps={{
                                            type: 'password'
                                        }}
                                        isRequired
                                        label={t('login.inputs.repeat-password.label')}
                                    />

                                    <div className="mt-2">
                                        <Link to={webRoutes.login.path} className="text-primary underline">
                                            {t('login.header.title')}
                                        </Link>
                                    </div>
                                    <div className="my-4">
                                        <ButtonPrimary type="submit">
                                            {t('login.labels.continue')}
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </AppLayout>
        </>
    );
};