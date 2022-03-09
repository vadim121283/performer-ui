import { render, screen } from '@testing-library/react';
import { AuthComponent } from './AuthComponent';
import { FakeIntlProvider } from '../../../utilsForTest/FakeIntlProvider';

/**
 * Пример unit тестирования локализации и рендеринга компонентов.
 * Делать unit тесты компонентов не обязательно.
 */
describe('AuthComponent localization', () => {
  let user;
  let password;
  const onUserChanged = (value) => (user = value);
  const onPasswordChanged = (value) => (password = value);
  const onClickLogin = () => true;
  let errorMessage = undefined;

  it('ru localization', async () => {
    render(
      <FakeIntlProvider locale={'ru'}>
        <AuthComponent
          model={{
            user,
            password,
            onUserChanged,
            onPasswordChanged,
            onClickLogin,
            errorMessage,
          }}
        />
      </FakeIntlProvider>
    );

    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  });

  it('en localization', async () => {
    render(
      <FakeIntlProvider locale={'en'}>
        <AuthComponent
          model={{
            user,
            password,
            onUserChanged,
            onPasswordChanged,
            onClickLogin,
            errorMessage,
          }}
        />
      </FakeIntlProvider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
