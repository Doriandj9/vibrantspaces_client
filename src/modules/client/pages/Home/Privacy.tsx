import { AppLayout } from "@/core/layouts/AppLayout";
import { useTranslation } from "react-i18next";



export const Privacy = () => {
    const [t] = useTranslation('client');
    return (
        <>
            <AppLayout>
                <div className="w-10/12 m-auto">
                    <div className="app-container-fade h-full w-full">
                        <h2 className="text-xl text-center text-mode-white font-bold pt-2">
                            {t('privacy.Privacy Policy for Vibrant Essences LLC')}
                        </h2>
                        <p className="p-2">
                            {t('privacy.1 paragraph')}
                        </p>
                        <div className="p-2">
                            <ol className="list-decimal font-bold pl-6 pr-2 flex flex-col gap-4">
                                <li>
                                    {t('privacy.ul1 Information We Collect')}
                                    <p className="font-normal">
                                        {t('privacy.ul1 header')}
                                    </p>
                                    <ul className="font-normal pl-6 flex flex-col gap-2 mt-4 list-disc" >
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul1 list1') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul1 list2') }} />
                                    </ul>
                                </li>

                                <li>
                                    {t('privacy.ul2')}
                                    <p className="font-normal">
                                        {t('privacy.ul2 header')}
                                    </p>
                                    <ul className="font-normal pl-6 flex flex-col gap-2 mt-4 list-disc" >
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul2 list1') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul2 list2') }} />
                                    </ul>
                                </li>
                                <li>
                                    {t('privacy.ul3 Use of Your Information')}
                                   <p className="font-normal">
                                        {t('privacy.ul3 header')}
                                    </p>
                                    <ul className="font-normal pl-6 flex flex-col gap-2 mt-4 list-disc" >
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list1') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list2') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list3') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list4') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list5') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list6') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list7') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul3 list8') }} />
                                    </ul>
                                </li>
                                 <li>
                                    {t('privacy.ul4 Disclosure of Your Information')}
                                   <p className="font-normal">
                                        {t('privacy.ul4 header')}
                                    </p>
                                    <ul className="font-normal pl-6 flex flex-col gap-2 mt-4 list-disc" >
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul4 list1') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul4 list2') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul4 list3') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul4 list4') }} />
                                        <li dangerouslySetInnerHTML={{ __html: t('privacy.ul4 list5') }} />
                                    </ul>
                                </li>

                                <li>
                                    {t('privacy.ul5 Cookies and Tracking Technologies')}
                                   <p className="font-normal">
                                        {t('privacy.ul5 paragraph')}
                                    </p>
                                </li>
                              
                               <li>
                                    {t('privacy.ul6 Third-Party Links')}
                                   <p className="font-normal">
                                        {t('privacy.ul6 paragraph')}
                                    </p>
                                </li>
                                <li>
                                    {t('privacy.ul7 Children\'s Privacy')}
                                   <p className="font-normal">
                                        {t('privacy.ul7 paragraph')}
                                    </p>
                                </li>
                                <li>
                                    {t('privacy.ul8 Data Security')}
                                   <p className="font-normal">
                                        {t('privacy.ul8 paragraph')}
                                    </p>
                                </li>
                                <li>
                                    {t('privacy.ul9 Data Retention')}
                                   <p className="font-normal">
                                        {t('privacy.ul9 paragraph')}
                                    </p>
                                </li>
                                <li>
                                    {t('privacy.ul10 Your Rights (Where Applicable Under Law)')}
                                   <p className="font-normal">
                                        {t('privacy.ul10 paragraph')}
                                    </p>
                                </li>
                                <li>
                                    {t('privacy.ul11 Updates to this Privacy Policy')}
                                   <p className="font-normal">
                                        {t('privacy.ul11 paragraph')}
                                    </p>
                                </li>

                                <li>
                                    {t('privacy.ul12 Contact Us')}
                                   <p className="font-normal">
                                        {t('privacy.ul12 paragraph1')}
                                    </p>
                                    <p className="font-normal">
                                        {t('privacy.ul12 paragraph2')}
                                    </p>
                                    <p className="font-normal">
                                        {t('privacy.ul12 paragraph3')}
                                    </p>
                                    <p className="font-normal">
                                        {t('privacy.ul12 paragraph4')}
                                    </p>
                                </li>
                            </ol>

                            <div className="mt-6">
                                <div className="flex flex-col items-center text-center  font-semibold">
                                    <h4>Vibrant Essences LLC</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </AppLayout>
        </>
    );
};