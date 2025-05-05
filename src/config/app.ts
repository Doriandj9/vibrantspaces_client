import { AppConfig, LanguageApp } from "./@types/app";
import { appColors } from "./appColors";

const host = import.meta.env.VITE_API_URL;
const versionApp = import.meta.env.VITE_APP_VERSION;
const endPointApi = import.meta.env.VITE_ENDPOINT_API;

let lngDefault: LanguageApp = 'en';

if(localStorage.languageApp){
  const op = localStorage.languageApp;

  switch(op){
    case 'es': 
        lngDefault = 'es';
    break;

    case 'en': 
        lngDefault = 'en';
    break;

    default: 
        lngDefault= 'en';
}
}

export const app: AppConfig = {
    server: `${host}${endPointApi}/`,
    base_server: host,
    colors: appColors,
    environment: 'local',
    apiV: versionApp,
    timeRefetchInterval: (1000 * 30),
    language: lngDefault,
    host: host
};