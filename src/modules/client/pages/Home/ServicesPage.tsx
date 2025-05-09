import { AppLayout } from "@/core/layouts/AppLayout";
import { useParams } from "react-router-dom";
import { useGetService } from "../../hooks/services/hook";
import { AppErrorApi } from "@/core/components/AppErrorApi";
import { AppLoading } from "@/core/components/AppLoading";
import { Field, HStack, List, RadioGroup } from "@chakra-ui/react";
import { LuCircleCheck } from "react-icons/lu";
import { useLanguageApp } from "@/store/languageStore";
import { useForm } from "react-hook-form";
import { AppInput } from "@/core/components/AppInput";
import { useTranslation } from "react-i18next";
import { AppTextarea } from "@/core/components/AppTextarea";
import { ButtonPrimary } from "@/core/components/ButtonPrimary";
import { IoSendOutline } from "react-icons/io5";
import { appLoadImage } from "@/core/utilities/img/convert";


export const ServicesPage = () => {
    const { name } = useParams();
    const url = new URL(window.location.href);
    const id = url.searchParams.get('i');
    const lang = useLanguageApp((s) => s.language);
    const { control } = useForm();
    const { data, isLoading, error } = useGetService(id);
    const [t] = useTranslation('client');

    if (error) {
        return <AppErrorApi error={error} />;
    }

    const items = [
        { label: 'Por llamada', value: 'Llamada' },
        { label: 'Por mensaje', value: 'Mensaje' }
    ];
    return (
        <>
            <AppLoading loading={isLoading} />
            <AppLayout >
                <div className="flex items-center justify-center flex-grow flex-col" >
                    <h2 className="my-6 text-3xl font-black italic text-primary  text-center font-mono">{name}</h2>
                    <div className="w-full min-h-90 flex flex-col md:flex-row justify-center items-center gap-4 ">
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
                        <div className="">
                            <form action="">
                            <ButtonPrimary>
                               <IoSendOutline />  Reserva este servicio
                            </ButtonPrimary>
                            <AppInput
                                control={control}
                                name=""
                                className="w-full"
                                fullWidth
                                isRequired
                                label={t('form-services-contact.nombres')}
                            />

                            <AppInput
                                control={control}
                                name=""
                                className="w-full mt-2"
                                fullWidth
                                isRequired
                                label={t('form-services-contact.número_de_contacto')}
                            />


                            <AppInput
                                control={control}
                                name=""
                                className="w-full mt-2"
                                fullWidth
                                inputProps={{
                                    type: 'email'
                                }}
                                isRequired
                                label={t('form-services-contact.correo')}
                            />
                            <div className="mt-2">
                                <Field.Root >
                                    <Field.Label>
                                        <strong>
                                            {t('form-services-contact.preferencia_contacto')}
                                        </strong>
                                        <span className="text-red-600">*</span>
                                    </Field.Label>
                                    <RadioGroup.Root defaultValue="1">
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

                                </Field.Root>
                            </div>

                            <AppTextarea
                                control={control}
                                name=""
                                className="w-full mt-4"
                                fullWidth
                                label={t('form-services-contact.descripción_área_limpieza')}
                            />

                            <AppInput
                                control={control}
                                name=""
                                className="w-full mt-2"
                                fullWidth
                                inputProps={{
                                    type: 'number'
                                }}
                                label={t('form-services-contact.baños')}
                            />
                            <AppInput
                                control={control}
                                name=""
                                className="w-full mt-2"
                                fullWidth
                                inputProps={{
                                    type: 'number'
                                }}
                                label={t('form-services-contact.cocinas')}
                            />
                             <AppInput
                                control={control}
                                name=""
                                className="w-full mt-2"
                                fullWidth
                                inputProps={{
                                    type: 'number'
                                }}
                                label={t('form-services-contact.dormitorios')}
                            />
                             <AppInput
                                control={control}
                                name=""
                                className="w-full mt-2"
                                fullWidth
                                inputProps={{
                                    type: 'number'
                                }}
                                label={t('form-services-contact.patio')}
                            />
                            <AppInput
                                control={control}
                                name=""
                                className="w-full mt-2"
                                fullWidth
                                inputProps={{
                                    type: 'number'
                                }}
                                label={t('form-services-contact.escaleras')}
                            />
                            </form>

                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
};