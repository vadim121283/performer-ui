import { Config } from '../../entity/init/models/Config';
import { Locale } from '../../entity/init/models/Locales';

export interface InitStoragePort {
  isInitialized: boolean;
  setInitialized(): void;
  config: Config;
  setConfig(config: Config): void;
  locale?: Locale | undefined;
  setLocale(locale: Locale): void;
}
