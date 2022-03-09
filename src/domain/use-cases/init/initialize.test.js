import { fakeRest } from '../../../utilsForTest/fakeRest';
import { useFakeLogger } from '../../../utilsForTest/fakeLogger';
import { useInitialize } from './initialize';

describe('initialize.tsx testing', () => {
  let isInitialized = false;

  /** 'OK' | 'NOTCONFIG' | 'NOTLOCALES' */
  let steps = 'OK';

  function useInitApi() {
    const fakeLocales = {
      locales: { ru: { lang: 'ru', messages: {} } },
      locales_config: { default_locale: 'ru', avialable_locales: ['ru'] },
    };

    return {
      loadConfig() {
        if (steps === 'NOTCONFIG') return fakeRest(undefined);
        return fakeRest({ apiUrl: 'apiurl', wsUrl: 'wsurl' });
      },
      loadLocales() {
        if (steps === 'NOTLOCALES') return fakeRest(undefined);
        return fakeRest(fakeLocales);
      },
    };
  }

  function useInitStorage() {
    let config = {
      apiUrl: '',
      wsUrl: '',
    };
    let locale = undefined;

    return {
      isInitialized,
      setInitialized() {
        return (isInitialized = true);
      },
      config,
      setConfig(value) {
        return (config = value);
      },
      locale,
      setLocale(value) {
        return (locale = value);
      },
    };
  }

  const fakeUseInjection = () => {
    return {
      useInitApi,
      useInitStorage,
      useLogger: useFakeLogger,
    };
  };

  it('app initialized', async () => {
    steps = 'OK';
    const { initialize } = useInitialize(fakeUseInjection);
    const init = await initialize();

    expect(init).toEqual(true);
  });

  it('cant load config', async () => {
    steps = 'NOTCONFIG';
    const { initialize } = useInitialize(fakeUseInjection);
    const init = await initialize();
    expect(init).toEqual(false);
  });

  it('cant load locales', async () => {
    steps = 'NOTLOCALES';
    const { initialize } = useInitialize(fakeUseInjection);
    const init = await initialize();
    expect(init).toEqual(false);
  });
});
