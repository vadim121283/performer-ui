export type AppLocales = 'ru' | 'en';
export interface Locale {
  lang: AppLocales;
  messages: {};
}
export interface Locales {
  [key: string]: Locale;
}
export interface LocalesConfig {
  default_locale: AppLocales;
  avialable_locales: string[];
}
