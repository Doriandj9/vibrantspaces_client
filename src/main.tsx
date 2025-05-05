import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from "@/components/ui/provider";
import i18next from 'i18next';
import { app } from './config/app.ts';
import core_en from '@/core/translations/en/core.json';
import core_es from '@/core/translations/es/core.json';
import client_es from '@/modules/client/translations/es/client.json';
import client_en from '@/modules/client/translations/en/client.json';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import '@/styles/main.css';

i18next.init({
  lng: app.language,
  interpolation: { escapeValue: true },
  resources: {
    es: {
      core: core_es,
      client: client_es,
    },
    en: {
      core: core_en,
      client: client_en,

    }
  }
});


const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
    <QueryClientProvider client={client}>
      <Provider>
        <Router>
          <App />
        </Router>
      </Provider>
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode>,
);
