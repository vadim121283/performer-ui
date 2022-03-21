import { DIContainerType } from '../../app/di/DIContext';
// TODO: Add tests
export const useLogin = (useInjection: () => DIContainerType) => {
  const { useAuthApi, useAuthStorage, useLogger } = useInjection();
  const { debug } = useLogger(`login`);
  const { setIsAuthorized, setUser, setAuthLocalStorage } = useAuthStorage();
  const { loginRequest } = useAuthApi();

  async function loginUser(login: string, password: string) {
    const loadUser = await loginRequest(login, password);
    if (loadUser?.token) {
      debug(`User authorized: `, loadUser.login);
      setUser(loadUser);
      setAuthLocalStorage(loadUser);
      setIsAuthorized();
    }
  }

  return {
    loginUser,
  };
};
