import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { ApolloProvider } from '@apollo/client';
import { InitView } from './app/init/init.view';
import { AuthView } from './app/auth/auth.view';
import { MainView } from './app/main/main.view';
import { useInitViewModel } from './app/init/init.view.model';
import { useAuthViewModel } from './app/auth/auth.view.model';
import { connectApolloClient } from './utils/graphql/connectApolloClient';
import { useInitStorage } from './app/init/init.service';
import { useAuthStorage } from './app/auth/auth.service';

const Init = () => <InitView model={useInitViewModel()} />;
const Auth = () => <AuthView model={useAuthViewModel()} />;

function App() {
  const { isInitialized, locale, config } = useInitStorage();
  const { isAuthorized, user } = useAuthStorage();

  const AppInitialized = () => {
    const Main = () => {
      if (config && user?.token) {
        const client = connectApolloClient(config.gqlUrl, user?.token);
        return (
          <ApolloProvider client={client}>
            <MainView />
          </ApolloProvider>
        );
      }
      return <></>;
    };

    return (
      <IntlProvider locale={locale?.lang || 'ru'} messages={locale?.messages}>
        {isAuthorized ? <Main /> : <Auth />}
      </IntlProvider>
    );
  };

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={isInitialized ? <AppInitialized /> : <Init />}
          />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
