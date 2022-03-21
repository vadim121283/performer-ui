import { DIContainerType } from '../../app/di/DIContext';

export function useInitialize(useInjection: () => DIContainerType) {
  const { useInitApi, useInitStorage, useLogger } = useInjection();
  const { setConfig, setLocale, setInitialized } = useInitStorage();
  const { loadConfig, loadLocales } = useInitApi();
  const { debug, error } = useLogger(`initialize`);

  async function initialize() {
    const config = await loadConfig();
    if (config) {
      debug('Config loaded', config);
      setConfig(config);
    }
    const locales = await loadLocales();
    if (locales) {
      debug('Locales loaded', locales.locales_config);
      const currentLocale =
        locales.locales[locales.locales_config.default_locale];
      setLocale(currentLocale);
    }
    if (config && locales) {
      setInitialized();
      return true;
    } else {
      error(
        `Cant initialize app. Config: ${!!config}. Locales: ${!!loadLocales}`
      );
      return false;
    }
  }

  return {
    initialize,
  };
}
