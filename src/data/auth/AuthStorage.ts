import { User } from '../../common/domain/entity/User';
import { AuthStoragePort } from '../../domain/ports/auth/AuthStoragePort';
import { useAppDispatch, useAppSelector } from '../redux/ReduxHooks';
import {
  selectAuthError,
  selectIsAuthorized,
  selectUser,
  setAuthError,
  setIsAuthorized,
  setUser,
} from './authSlice';

export function useAuthStorage(): AuthStoragePort {
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
