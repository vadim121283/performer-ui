import { IntlProvider } from 'react-intl';
import ru from '../../public/locales/ru/messages.json';
import en from '../../public/locales/en/messages.json';
import { AppLocales } from '../app/init/model/Locales';

export const FakeIntlProvider = ({
  locale,
  children,
}: {
  locale: AppLocales;
  children: JSX.Element;
}) => {
  const messages = {
    ru,
    en,
  };
  const msg = messages[locale];

  return (
    <IntlProvider locale={locale} messages={msg}>
      {children}
    </IntlProvider>
  );
};
