import Resources from './trans';
import ResourcesClient from '@/modules/client/@types/trans';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNs: 'esCore',
        resources: Resources & ResourcesClient;
    }
}
