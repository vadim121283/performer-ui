import { User } from '../../domain/entity/auth/models/User';
import { AuthApiPort } from '../../domain/ports/auth/AuthApiPort';
import { useLogger } from '../../utils/logger';
import { useRest } from '../rest';
import { useAuthStorage } from './AuthStorage';
import { authValidator } from './authValidator';

export function useAuthApi(): AuthApiPort {
  const { postLogin } = useRest();
  const { error } = useLogger(`AuthApi`);
  const { setAuthError } = useAuthStorage();

  const loginRequest = async (login: string, password: string) => {
    const response = await postLogin({
      login,
      password,
    });
    if (response) {
      if (response.ok) {
        const user = (await response.json()) as User;
        if (user) {
          return user;
        }
      } else {
        setAuthError(authValidator(response));
      }
    }
    error(`Cant authorize`);
  };

  return {
    loginRequest,
  };
}
