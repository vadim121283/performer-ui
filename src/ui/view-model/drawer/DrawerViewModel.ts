import { DrawerMenuItem } from '../../../data/drawer/DrawerMenuItem';
import { useDrawerStorage } from '../../../data/drawer/DrawerStorage';
import { useInjection } from '../../../di/inject';
import { useLogout } from '../../../domain/use-cases/auth/logoutUser';

export interface DrawerViewModel {
  logout: () => void;
  menuItem: DrawerMenuItem;
  setMenuItem(value: DrawerMenuItem): void;
}

export function useDrawerViewModel(): DrawerViewModel {
  const { logout } = useLogout(useInjection);
  const { menuItem, setMenuItem } = useDrawerStorage();
  return {
    logout,
    menuItem,
    setMenuItem,
  };
}
