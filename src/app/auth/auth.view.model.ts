import { useState } from 'react';
import { useAuthStorage } from './auth.service';
import { useInjection } from '../di/inject';
import { useLogin } from '../../use-cases/auth/loginUser';
import { useFormValidator } from '../../utils/formValidatorR';

export interface AuthViewModel {
  login: string;
  password: string;
  onUserChanged(value: string): void;
  onPasswordChanged(value: string): void;
  onClickLogin(): void;
  authError?: string;
}

export function useAuthViewModel(): AuthViewModel {
  const { isValidString } = useFormValidator();
  const [login, setLogin] = useState(``);
  const [password, setPassword] = useState(``);
  const { loginUser } = useLogin(useInjection);
  const { authError, setAuthError } = useAuthStorage();

  const loginButton = () => {
    setAuthError(undefined);
    if (isValidString(login) && isValidString(password)) {
      loginUser(login, password);
    } else {
      setAuthError('empty');
    }
  };

  return {
    login,
    password,
    onUserChanged(value) {
      return setLogin(value);
    },
    onPasswordChanged(value) {
      return setPassword(value);
    },
    onClickLogin() {
      return loginButton();
    },
    authError,
  };
}
