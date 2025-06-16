import { AppLayout } from "@/core/layouts/AppLayout";
import logo from '@/assets/img/logo-g.png';
import { SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "@/core/components/AppInput";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { useTranslation } from "react-i18next";
import { useEmailSchema } from "../../validations/loginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLoading } from "@/core/components/AppLoading";
import { useForgotPassword } from "../../hooks/auth/hook";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";
import { showError } from "@/core/utilities/errors";

export const ForgotPassword = () => {
    const [t] = useTranslation('client');
    const schema = useEmailSchema();
    const { forgot } = useForgotPassword();
    const { control, handleSubmit, reset } = useForm<{ email: string }>({
        resolver: zodResolver(schema)
    });

    const onLogin: SubmitHandler<{ email: string }> = (data) => {
        forgot.mutate(data, {
            onSuccess() {
                toast.success(t('validations.messages.success-mail'));
                reset({ email: '' });
            },
            onError(error) {
                showError(error);
            },
        });
    };

    return (
        <>
            <AppLoading loading={forgot.isPending} />
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

                                    <div className="mt-2 relative z-10">
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