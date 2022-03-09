import { User } from '../../entity/auth/models/User';

export interface AuthStoragePort {
  isAuthorized: boolean;
  setIsAuthorized(): void;
  setIsUnauthorized(): void;
  user?: User;
  setUser(user: User | undefined): void;
  authError?: string;
  setAuthError(value: AuthError | undefined): void;
  getAuthLocalStorage(): User | undefined;
  setAuthLocalStorage(value: User): boolean;
  removeAuthLocalStorage(): void;
}
