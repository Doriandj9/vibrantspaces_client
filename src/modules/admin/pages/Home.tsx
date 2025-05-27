import Lottie from "lottie-react";
import sunny from '@/assets/lotties/Sunny.json';
import { useTranslation } from "react-i18next";
import { appName } from "@/config/app";


export const HomeAdmin = () => {
    const [t] = useTranslation('client');

    return (
        <>
            <div className="flex justify-start items-center app-container-fade min-h-screen flex-col">
                <Lottie className="w-60 h-60" animationData={sunny} loop={true} />

                <div className="mt-4">
                    <h3 className="text-secondary text-2xl text-center">
                         {t('login.labels.Welcome to')} {appName}       
                    </h3>
                </div>
            </div>
        </>
    );
}; 