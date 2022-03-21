import { Config } from './model/Config';
import { Locale, Locales, LocalesConfig } from './model/Locales';

export interface InitStoragePort {
  isInitialized: boolean;
  setInitialized(): void;
  config: Config;
  setConfig(config: Config): void;
  locale?: Locale | undefined;
  setLocale(locale: Locale): void;
}

export interface InitApiPort {
  loadConfig(): Promise<Config | undefined>;
  loadLocales(): Promise<
    { locales: Locales; locales_config: LocalesConfig } | undefined
  >;
}
