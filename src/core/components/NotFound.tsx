import { AppLayout } from "../layouts/AppLayout";
import img from '@/assets/img/undraw_bug-fixing_sgk7.svg';
import { ButtonPrimary } from "./ButtonPrimary";
import { Link } from "react-router-dom";

export const NotFound = () => {

    return (
        <>
            <AppLayout>
                <div className="flex flex-col items-center justify-center">
                    <img src={img} alt="" className="w-96 h-96" />
                    <p className="text-2xl font-bold text-slate-700 mb-4">
                        Error 404: Page Not Found
                    </p>
                    <ButtonPrimary asChild>
                        <Link to="/" >Go to Home</Link>
                    </ButtonPrimary>
                </div>

            </AppLayout>
        </>
    );
};