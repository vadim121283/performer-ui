import { Config } from './model/Config';
import { AppLocales, Locale, Locales, LocalesConfig } from './model/Locales';
import { InitApiPort, InitStoragePort } from './init.port';
import { asyncProcessArray } from '../../utils/asyncProcessArray';
import { useLogger } from '../../utils/logger';
import {
  selectConfig,
  selectIsInitialized,
  selectLocale,
  setConfig,
  setInitialized,
  setLocale,
} from './init.slice';
import { useAppDispatch, useAppSelector } from '../redux/ReduxHooks';

const CONFIG_URL = '/config/config.json';
const CONFIG_DEVELOPMENT_URL = '/config/config-development.json';
const LOCALES_CONFIG_URL = '/locales/locales_config.json';

async function fetching(url: string) {
  let options: RequestInit = {
    method: 'GET',
  };

  try {
    const response = await fetch(url, options);
    switch (response.status) {
      case 200:
        return response;
      case 404:
        console.error('Not found url: ', url);
        return response;
      case 403:
        console.error('Forbidden url or wrong login/password: ', url);
        return response;
      case 503:
        console.error('Service Unavailable', url);
        return response;
      default:
        return response;
    }
  } catch (err) {
    console.error('Cant fetch url: ', url);
  }
}

export function useInitStorage(): InitStoragePort {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);
  const config = useAppSelector(selectConfig);
  const locale = useAppSelector(selectLocale);

  return {
    isInitialized,
    setInitialized() {
      return dispatch(setInitialized());
    },
    config,
    setConfig(value) {
      return dispatch(setConfig(value));
    },
    locale,
    setLocale(value) {
      return dispatch(setLocale(value));
    },
  };
}

export function useInitApi(): InitApiPort {
  const { error } = useLogger('InitApi');

  async function loadConfig() {
    const tryDevelopConfigLoad = async () => {
      const response = await fetching(CONFIG_DEVELOPMENT_URL);
      if (response) {
        try {
          const config = (await response.json()) as Promise<Config>;
          return config;
        } catch (err) {
          return undefined;
        }
      }
    };

    const productionConfigLoad = async () => {
      const response = await fetching(CONFIG_URL);
      if (response) {
        try {
          const config = (await response.json()) as Promise<Config>;
          return config;
        } catch (err) {
          error('Cant read config');
        }
      }
    };

    if (process.env.NODE_ENV === 'development') {
      const config = await tryDevelopConfigLoad();
      if (config) return config;
      return productionConfigLoad();
    }
  }

  async function loadLocales() {
    const response = await fetching(LOCALES_CONFIG_URL);
    if (response) {
      try {
        const localesConfig = (await response.json()) as LocalesConfig;
        let appLocales: {
          locales: Locales;
          locales_config: LocalesConfig;
        } = { locales: {}, locales_config: localesConfig };

        const addLocale = async (localeName: AppLocales) => {
          const responseLocale = await fetching(
            `/locales/${localeName}/messages.json`
          );
          if (responseLocale) {
            try {
              const loaded = (await responseLocale.json()) as Locale;
              appLocales.locales[localeName] = {
                lang: localeName,
                messages: loaded,
              };
            } catch (err) {
              error(`Cant read locale: ${localeName}`);
            }
          }
        };

        await asyncProcessArray(localesConfig.avialable_locales, addLocale);

        return appLocales;
      } catch (err) {
        error('Cant read locales config');
      }
    }
    error('Cant load url: ', LOCALES_CONFIG_URL);
  }

  return {
    loadConfig,
    loadLocales,
  };
}
