import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { InitComponent } from './ui/view/init/InitComponent';
import { AuthComponent } from './ui/view/auth/AuthComponent';
import { MainComponent } from './ui/view/main/MainComponent';
import { useInitViewModel } from './ui/view-model/init/InitViewModel';
import { useAuthViewModel } from './ui/view-model/auth/AuthViewModel';
import { useInitStorage } from './data/init/InitStorage';
import { useAuthStorage } from './data/auth/AuthStorage';

const Init = () => <InitComponent model={useInitViewModel()} />;
const Auth = () => <AuthComponent model={useAuthViewModel()} />;

function App() {
  const { isInitialized, locale } = useInitStorage();
  const { isAuthorized } = useAuthStorage();

  const AppInitialized = () => {
    return (
      <IntlProvider locale={locale?.lang || 'ru'} messages={locale?.messages}>
        {isAuthorized ? <MainComponent /> : <Auth />}
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
