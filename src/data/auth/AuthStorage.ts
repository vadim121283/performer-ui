import { User } from '../../domain/entity/auth/models/User';
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

  function getAuthLocalStorage() {
    const login = localStorage.getItem(`login`);
    const token = localStorage.getItem(`token`);
    if (login && token) return { login, token };
  }

  function setAuthLocalStorage(value: User) {
    if (value.login && value.token) {
      localStorage.setItem(`userName`, value.login);
      localStorage.setItem(`token`, value.token);
      return true;
    }
    return false;
  }

  function removeAuthLocalStorage() {
    localStorage.removeItem(`userName`);
    localStorage.removeItem(`token`);
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
