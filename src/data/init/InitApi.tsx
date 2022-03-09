import { Config } from '../../domain/entity/init/models/Config';
import {
  AppLocales,
  Locale,
  Locales,
  LocalesConfig,
} from '../../domain/entity/init/models/Locales';
import { InitApiPort } from '../../domain/ports/init/InitApiPort';
import { asyncProcessArray } from '../../utils/asyncProcessArray';
import { useLogger } from '../../utils/logger';
import { useRest } from '../rest';

const CONFIG_URL = '/config/config.json';
const CONFIG_DEVELOPMENT_URL = '/config/config-development.json';
const LOCALES_CONFIG_URL = '/locales/locales_config.json';

export function useInitApi(): InitApiPort {
  const { getLocal } = useRest();
  const { error } = useLogger('InitApi');

  async function loadConfig() {
    const tryDevelopConfigLoad = async () => {
      const response = await getLocal(CONFIG_DEVELOPMENT_URL);
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
      const response = await getLocal(CONFIG_URL);
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
    const response = await getLocal(LOCALES_CONFIG_URL);
    if (response) {
      try {
        const localesConfig = (await response.json()) as LocalesConfig;
        let appLocales: {
          locales: Locales;
          locales_config: LocalesConfig;
        } = { locales: {}, locales_config: localesConfig };

        const addLocale = async (localeName: AppLocales) => {
          const responseLocale = await getLocal(
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
