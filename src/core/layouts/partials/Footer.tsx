// import facebook  from '@/assets/img/facebook.svg';
import instagram from '@/assets/img/instagram.svg';
import { appName } from '@/config/app';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


export const Footer = () => {
    const [t] = useTranslation('core');

    return (
        <>
            <div className='mt-20 flex-grow flex  items-stretch '>
                <div className="h-24 bg-primary text-white w-full self-end">
                    <div className="flex justify-between items-center h-full w-full px-4">
                        <div>
                            © {appName + ' ' + t('app.copy')}
                        </div>
                        <div className='w-60 flex justify-end gap-4'>
                            {/* <Link to={''} target='_blank'>
                        <img className='h-10' src={facebook} alt='Facebook' />
                        </Link> */}
                            <Link to={'https://www.instagram.com/vibrantespacesfl?igsh=MWo1NmhqN2ZiMHJtbg=='} target='_blank'>
                                <img className='h-10' src={instagram} alt='Instagram' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};