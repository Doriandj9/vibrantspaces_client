import { AppLayout } from "@/core/layouts/AppLayout";
import logo from '@/assets/img/logo-g.png';
import { SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "@/core/components/AppInput";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { useTranslation } from "react-i18next";
import { LoginForm, useLoginSchema } from "../../validations/loginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthApp } from "../../hooks/auth/hook";
import { useAuthStore } from "@/store/authStore";
import { AppLoading } from "@/core/components/AppLoading";

export const Login = () => {
    const [t] = useTranslation('client');
    const schema = useLoginSchema();
    const { auth } = useAuthApp();
    const { updateToken, updateUser } = useAuthStore((state) => state);
    const { control, handleSubmit } = useForm<LoginForm>({
        resolver: zodResolver(schema)
    });

    const onLogin: SubmitHandler<LoginForm> = (data) => {
        auth.mutate(data, {
            onSuccess(data) {
                updateToken(data.token, data.time_expired_token);
                updateUser(data.jwt);
            },
        });
    };

    return (
        <>
        <AppLoading loading={auth.isPending} />
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
                                        control={control}
                                        label={t('login.inputs.email.placeholder')}
                                    />
                                    <AppInput
                                        className="w-full"
                                        name="password"
                                        fullWidth
                                        inputProps={{
                                            type: 'password'
                                        }}
                                        control={control}
                                        label={t('login.inputs.password.placeholder')}
                                    />
                                    <div className="my-4">
                                        <ButtonPrimary type="submit">
                                            Iniciar Sesión
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