import { User } from '../../common/domain/entity/User';
import { AuthPort } from './auth.port';
import { useLogger } from '../../utils/logger';
import { useRest } from '../rest';
import { authValidator } from './auth.validator';
import { useAppDispatch, useAppSelector } from '../redux/ReduxHooks';
import {
  selectAuthError,
  selectIsAuthorized,
  selectUser,
  setIsAuthorized,
  setUser,
  setAuthError,
} from './auth.slice';

export function useAuthService(): AuthPort {
  const { postLogin } = useRest();
  const { error } = useLogger(`AuthService`);

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

  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const user = useAppSelector(selectUser);
  const authError = useAppSelector(selectAuthError);

  function getAuthLocalStorage(): User {
    let user = {
      guid: localStorage.getItem(`auth_guid`) || '',
      login: localStorage.getItem(`auth_login`) || '',
      token: localStorage.getItem(`auth_token`) || '',
    };
    return user;
  }

  function setAuthLocalStorage(value: User) {
    if (value.guid && value.login && value.token) {
      localStorage.setItem(`auth_guid`, value.guid);
      localStorage.setItem(`auth_login`, value.login);
      localStorage.setItem(`auth_token`, value.token);
      return true;
    }
    return false;
  }

  function removeAuthLocalStorage() {
    localStorage.removeItem(`auth_guid`);
    localStorage.removeItem(`auth_login`);
    localStorage.removeItem(`auth_token`);
  }

  return {
    loginRequest,
    isAuthorized,
    setIsAuthorized() {
      return dispatch(setIsAuthorized(true));
    },
    setIsUnauthorized() {
      return dispatch(setIsAuthorized(false));
    },
    user,
    setUser(value) {
      return dispatch(setUser(value));
    },
    authError,
    setAuthError(value) {
      return dispatch(setAuthError(value));
    },
    getAuthLocalStorage,
    setAuthLocalStorage,
    removeAuthLocalStorage,
  };
}
