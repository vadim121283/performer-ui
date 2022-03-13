import { DIContainerType } from '../../app/di/DIContext';
// TODO: Add tests
export const useLogin = (useInjection: () => DIContainerType) => {
  const { useAuthService, useLogger } = useInjection();
  const { debug } = useLogger(`login`);
  const { loginRequest, setIsAuthorized, setUser, setAuthLocalStorage } =
    useAuthService();

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
