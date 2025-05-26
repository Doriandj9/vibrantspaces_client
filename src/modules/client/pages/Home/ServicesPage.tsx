import { AppLayout } from "@/core/layouts/AppLayout";
import { useParams } from "react-router-dom";
import { useGetService, useGetUserService, useStoreDataService } from "../../hooks/services/hook";
import { AppErrorApi } from "@/core/components/AppErrorApi";
import { AppLoading } from "@/core/components/AppLoading";
import { Field, HStack, List, RadioGroup } from "@chakra-ui/react";
import { LuCircleCheck } from "react-icons/lu";
import { useLanguageApp } from "@/store/languageStore";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "@/core/components/AppInput";
import { useTranslation } from "react-i18next";
import { AppTextarea } from "@/core/components/AppTextarea";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { IoSendOutline } from "react-icons/io5";
import { appLoadImage } from "@/core/utilities/img/convert";
import { useServicesDataSchema } from "../../validations/servicesDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataService } from "../../hooks/services/services";
import { useEffect, useState } from "react";
import { EMAIL_REG_EXPRE } from "@/core/utilities/Expressions";
import { toast } from "sonner";
import { showError } from "@/core/utilities/errors";

const optionContact = {
    es: [
        { label: 'Llamada', value: 'Llamada' },
        { label: 'Mensaje', value: 'Mensaje' }
    ],
    en: [
        { label: 'Call', value: 'Call' },
        { label: 'Message', value: 'Message' }
    ]
};

export const ServicesPage = () => {
    const { name } = useParams();
    const url = new URL(window.location.href);
    const id = url.searchParams.get('i');
    const lang = useLanguageApp((s) => s.language);
    const schema = useServicesDataSchema();
    const { store } = useStoreDataService();

    const [taxId, setTaxId] = useState<string | null>(null);
    const { data: user, isLoading: loadingUser } = useGetUserService(taxId);

    const { control, handleSubmit, setValue, reset } = useForm<FormDataService>({
        defaultValues: {
            services_id: id ?? ''
        },
        resolver: zodResolver(schema)
    });
    const { data, isLoading, error } = useGetService(id);
    const [t] = useTranslation('client');

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('contact_number', user?.contact_number);
        }
    }, [user]);
    const idToast = 'load';
    useEffect(() => {
        if (loadingUser) {
            toast.loading('Loading..', {
                id: idToast,
                position: 'top-center',
            });

        } else {
            toast.dismiss(idToast);
        }
    }, [loadingUser]);

    if (error) {
        return <AppErrorApi error={error} />;
    }

    const onSave: SubmitHandler<FormDataService> = (data) => {
        store.mutate(data, {
            onSuccess() {
                toast.success('Se envió correctamente tu solicitud', {
                    position: 'top-center'
                });
                reset();
            },
            onError(er) {
                showError(er);
            }
        });

    };

    const items = optionContact[lang];


    return (
        <>
            <AppLoading loading={isLoading || store.isPending} />
            <AppLayout >
                {
                    !isLoading &&
                    <div className="flex items-center justify-center flex-grow flex-col" >
                        <h2 className="my-6 text-3xl font-black italic text-primary  text-center font-mono">{name}</h2>
                        <div className="w-full min-h-90 flex flex-col md:flex-row justify-center items-start gap-4 ">
                            <div className="">
                                <div className=" relative p-2 text-gray-700">
                                    <List.Root gap="2" variant="plain" align="center">
                                        {data?.list?.translations[lang]?.values.map((item, index) => (
                                            <List.Item key={index}>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                {item.title}
                                            </List.Item>
                                        ))}
                                    </List.Root>
                                    {
                                        data?.picture &&
                                        <div className="flex justify-center mt-4">
                                            <img src={appLoadImage(data?.picture)} alt="IMG"
                                                className="w-[32rem] rounded-2xl"
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="w-full p-2 md:p-0 md:w-auto">
                                <form onSubmit={handleSubmit(onSave)}>
                                    <AppInput
                                        control={control}
                                        name="email"
                                        className="w-full"
                                        fullWidth
                                        inputProps={{
                                            type: 'email'
                                        }}
                                        isRequired
                                        label={t('form-services-contact.correo')}
                                        onBlur={(e) => {
                                            if (EMAIL_REG_EXPRE.test(e.target.value)) {
                                                setTaxId(e.target.value);
                                            }
                                        }}
                                    />

                                    <AppInput
                                        control={control}
                                        name="name"
                                        className="w-full mt-2"
                                        fullWidth
                                        isRequired
                                        label={t('form-services-contact.nombres')}
                                    />

                                    <AppInput
                                        control={control}
                                        name="contact_number"
                                        className="w-full mt-2"
                                        fullWidth
                                        isRequired
                                        label={t('form-services-contact.número_de_contacto')}
                                    />


                                    <AppInput
                                        control={control}
                                        name="address"
                                        className="w-full mt-2"
                                        fullWidth
                                        isRequired
                                        label={t('form-services-contact.direccion')}
                                    />

                                    <div className="mt-2">
                                        <Controller
                                            name="type_contact"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field.Root
                                                    invalid={!!fieldState.error}
                                                >
                                                    <Field.Label>
                                                        <strong>
                                                            {t('form-services-contact.preferencia_contacto')}
                                                        </strong>
                                                        <span className="text-red-600">*</span>
                                                    </Field.Label>
                                                    <RadioGroup.Root
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                    >
                                                        <HStack gap="6">
                                                            {items.map((item) => (
                                                                <RadioGroup.Item key={item.value} value={item.value}>
                                                                    <RadioGroup.ItemHiddenInput />
                                                                    <RadioGroup.ItemIndicator />
                                                                    <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                                                </RadioGroup.Item>
                                                            ))}
                                                        </HStack>
                                                    </RadioGroup.Root>
                                                    <Field.ErrorText>{fieldState?.error?.message}</Field.ErrorText>
                                                </Field.Root>
                                            )}
                                        />
                                    </div>

                                    <AppInput
                                        control={control}
                                        name="bathrooms"
                                        className="w-full mt-2"
                                        fullWidth
                                        inputProps={{
                                            type: 'number'
                                        }}
                                        label={t('form-services-contact.baños')}
                                    />

                                    <AppInput
                                        control={control}
                                        name="rooms"
                                        className="w-full mt-2"
                                        fullWidth
                                        inputProps={{
                                            type: 'number'
                                        }}
                                        label={t('form-services-contact.dormitorios')}
                                    />

                                    <AppTextarea
                                        control={control}
                                        name="description_area"
                                        className="w-full mt-4"
                                        fullWidth
                                        isRequired
                                        label={t('form-services-contact.descripción_área_limpieza')}
                                        textareaProps={{
                                            placeholder: t('form-services-contact.placeholder-description-area')
                                        }}
                                    />

                                    <div className="mt-4">
                                        <ButtonPrimary type="submit">
                                            <IoSendOutline />  Reserva este servicio
                                        </ButtonPrimary>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                }
            </AppLayout>
        </>
    );
};