import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from '@apollo/client';
import { InitView } from './app/init/init.view';
import { AuthView } from './app/auth/auth.view';
import { MainView } from './app/main/main.view';
import { useInitViewModel } from './app/init/init.view.model';
import { useAuthViewModel } from './app/auth/auth.view.model';
import { connectApolloClient } from './utils/graphql/connectApolloClient';
import { useInitService } from './app/init/init.service';
import { useAuthService } from './app/auth/auth.service';

const Init = () => <InitView model={useInitViewModel()} />;
const Auth = () => <AuthView model={useAuthViewModel()} />;

function App() {
  const { isInitialized, locale, config } = useInitService();
  const { isAuthorized, user } = useAuthService();

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
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={isInitialized ? <AppInitialized /> : <Init />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
