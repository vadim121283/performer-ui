import { DIContainerType } from '../../app/di/DIContext';
// TODO: Add tests
export const useLogout = (useInjection: () => DIContainerType) => {
  const { useAuthService, useLogger } = useInjection();
  const { debug } = useLogger(`logout`);
  const { setIsUnauthorized, setUser, removeAuthLocalStorage } =
    useAuthService();

  async function logout() {
    debug(`Logout user`);
    removeAuthLocalStorage();
    setUser(undefined);
    setIsUnauthorized();
  }

  return {
    logout,
  };
};
