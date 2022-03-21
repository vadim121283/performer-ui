import { DIContainerType } from '../../app/di/DIContext';
// TODO: Add tests
export const useLogout = (useInjection: () => DIContainerType) => {
  const { useAuthStorage, useLogger } = useInjection();
  const { debug } = useLogger(`logout`);
  const { setIsUnauthorized, setUser, removeAuthLocalStorage } =
    useAuthStorage();

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
