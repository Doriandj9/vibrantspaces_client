import { AppLayout } from "@/core/layouts/AppLayout";
// import img1  from '@/assets/img/sala1.png';
import { MdOutlineCleaningServices } from "react-icons/md";
import Lottie from "lottie-react";
import Mops from '@/assets/lotties/Mop.json';
import { useTranslation } from "react-i18next";
import { List } from "@chakra-ui/react";
import { LuCircleCheck } from "react-icons/lu";

export const HomePage = () => {
    const [t] = useTranslation('client');

    return (
        <AppLayout>
            <div className="flex m-auto justify-start items-center">
                {/* <img className="picture-glass" src={img1} alt="" /> */}

                <div className="min-w-96 pl-4">
                    <span className="flex items-center justify-start gap-2">
                        <MdOutlineCleaningServices className="w-4 h-4" />
                        Limpieza integral
                    </span>
                    <h1 className="text-6xl font-bold font-mono">
                        Vibrant Essences
                    </h1>
                </div>

            </div>
            <div className="w-full flex items-center">
                <div className=" w-6/12 xl:w-8/12 ">

                    <div className="flex">
                        <div className="pl-8 pt-8 flex-grow">
                            <h2 className="text-white font-bold font-mono text-3xl">Nuestro Servicios</h2>

                            <div className="flex w-full gap-4 mt-4 flex-wrap">
                                <article className="bg-gray-800 w-96 rounded-2xl p-2">
                                    <h3 className="text-xl underline">Servicios de limpieza residencial estándar</h3>
                                    <section className="mt-4">
                                        <p>
                                            <strong>Frecuencia:</strong> única, semanal, quincenal o mensual
                                        </p>
                                        <h4>Incluye:</h4>
                                        <List.Root gap="2" variant="plain" align="center" fontSize={'sm'}>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de baños (lavamanos, inodoros, duchas, espejos)
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Aspirado y fregado de pisos
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de cocina (superficies, microondas exterior, fregadero)
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de polvo en muebles, marcos, y superficies
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Sacar la basura
                                            </List.Item>
                                        </List.Root>
                                    </section>
                                </article>

                                <article className="bg-gray-800 w-96 rounded-2xl p-2">
                                    <h3 className="text-xl underline"> Limpieza profunda (Deep Cleaning)</h3>
                                    <section className="mt-4">
                                        <p>
                                            Ideal para primeras visitas o limpieza estacional.
                                        </p>
                                        <h4 className="">Incluye lo del servicio estándar, más:</h4>
                                        <List.Root gap="2" variant="plain" align="center" fontSize={'sm'}>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza profunda de cocina (interior de microondas, hornos y refrigeradores si se solicita)
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de baseboard, ventilaciones, persianas, y detrás de muebles
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Desinfección más detallada de superficies de alto contacto
                                            </List.Item>
                                        </List.Root>
                                    </section>
                                </article>

                                <article className="bg-gray-800 w-96 rounded-2xl p-2">
                                    <h3 className="text-xl underline">Servicios de limpieza residencial estándar</h3>
                                    <section className="mt-4">
                                        <p>
                                            <strong>Frecuencia:</strong> única, semanal, quincenal o mensual
                                        </p>
                                        <h4>Incluye:</h4>
                                        <List.Root gap="2" variant="plain" align="center" fontSize={'sm'}>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de baños (lavamanos, inodoros, duchas, espejos)
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Aspirado y fregado de pisos
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de cocina (superficies, microondas exterior, fregadero)
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de polvo en muebles, marcos, y superficies
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Sacar la basura
                                            </List.Item>
                                        </List.Root>
                                    </section>
                                </article>

                                <article className="bg-gray-800 w-96 rounded-2xl p-2">
                                    <h3 className="text-xl underline"> Limpieza profunda (Deep Cleaning)</h3>
                                    <section className="mt-4">
                                        <p>
                                            Ideal para primeras visitas o limpieza estacional.
                                        </p>
                                        <h4 className="">Incluye lo del servicio estándar, más:</h4>
                                        <List.Root gap="2" variant="plain" align="center" fontSize={'sm'}>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza profunda de cocina (interior de microondas, hornos y refrigeradores si se solicita)
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Limpieza de baseboard, ventilaciones, persianas, y detrás de muebles
                                            </List.Item>
                                            <List.Item>
                                                <List.Indicator asChild color="green.500">
                                                    <LuCircleCheck />
                                                </List.Indicator>
                                                Desinfección más detallada de superficies de alto contacto
                                            </List.Item>
                                        </List.Root>
                                    </section>
                                </article>
                            </div>


                        </div>

                    </div>
                </div>
                <div className="flex-grow flex justify-center">

                <div className="bg-gray-800 w-96 rounded-2xl">
                    <p className="p-4">
                        {t('paragraphs.initial')}
                        <Lottie animationData={Mops} loop />
                    </p>
                </div>
                </div>
            </div>
        </AppLayout >
    );
};