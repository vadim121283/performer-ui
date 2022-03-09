import { DIContainerType } from '../../../di/DIContext';

export function useInitialize(useInjection: () => DIContainerType) {
  const { useInitApi, useInitStorage, useLogger } = useInjection();
  const storage = useInitStorage();
  const api = useInitApi();
  const { debug, error } = useLogger(`initialize`);

  async function initialize() {
    const config = await api.loadConfig();
    if (config) {
      debug('Config loaded', config);
      storage.setConfig(config);
    }
    const loadLocales = await api.loadLocales();
    if (loadLocales) {
      debug('Locales loaded', loadLocales.locales_config);
      const currentLocale = loadLocales.locales[loadLocales.locales_config.default_locale];
      storage.setLocale(currentLocale);
    }
    if (config && loadLocales) {
      storage.setInitialized();
      return true;
    } else {
      error(`Cant initialize app. Config: ${!!config}. Locales: ${!!loadLocales}`);
      return false;
    }
  }

  return {
    initialize,
  };
}
