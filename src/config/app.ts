import { AppConfig, LanguageApp } from "./@types/app";
import { appColors } from "./appColors";
import axios from 'axios';

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


export const api = axios.create({
    baseURL: app.server + app.apiV,
    transformResponse: [function(data){
       try {
            const response = JSON.parse(data);
            if(app.environment !== 'prod' && !response.status) {
                return {...response, _error: response.message, message: response._error };
            }

            return response;
       } catch (e) {
            if(app.environment !== 'prod'){
                console.error(e);
            }
        return data;
       }
    }],
    headers: {
        'Accept': 'application/json',
    }
});
