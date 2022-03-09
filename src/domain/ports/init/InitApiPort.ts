import { Config } from '../../entity/init/models/Config';
import { Locales, LocalesConfig } from '../../entity/init/models/Locales';

export interface InitApiPort {
  /**
   * @throws {Error} if credentials have not passed
   */
  loadConfig(): Promise<Config | undefined>;
  loadLocales(): Promise<{ locales: Locales; locales_config: LocalesConfig } | undefined>;
}
