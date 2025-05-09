import { AppLayout } from "@/core/layouts/AppLayout";
import { useTranslation } from "react-i18next";
import logo from '@/assets/img/logo-g.png';
import { ServicesShowList } from "../../components/ServicesShowList";

export const HomePage = () => {
    const [t] = useTranslation('client');
    const [t_core] = useTranslation('core');

    return (
        <AppLayout>
            <div className="mt-4">
                <div className="w-full bg-img h-96 relative">
                    <div className='absolute top-0 left-0 w-full h-full bg-primary/50'>
                        <div className="flex items-center justify-center h-full w-full flex-col">

                            <h2 className="text-6xl font-bold font-mono text-white flex gap-2 items-center">
                                Vibrant Essences
                            </h2>

                            <p className="text-white text-2xl font-mono font-black text-center">
                                {t_core('app.FRESH VIBES, NATURAL TOUCH')}
                            </p>
                            <div className="flex items-center justify-center -mt-5">
                                <img src={logo} className="w-60 h-3w-60 rounded-full" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-11/12 xl:w-8/12 m-auto">
                    <div className="text-black w-full flex items-center justify-center flex-col text-2xl mt-8">
                        <h3 className="text-4xl font-black text-primary text-center font-mono italic">{t_core('app.Nosotros')}</h3>
                        <div className="mt-4 w-full">
                            <p className="text-center text-lg text-gray-700">
                                {t('paragraphs.initial')}
                            </p>
                        </div>
                    </div>
                    <h2 className="my-6 text-3xl font-black italic text-primary  text-center font-mono">{t_core('app.Services')}</h2>
                    <ServicesShowList />
                </div>
            </div>
        </AppLayout >
    );
};


