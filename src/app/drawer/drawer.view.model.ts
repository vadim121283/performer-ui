import { DrawerMenuItem } from './DrawerMenuItem';
import { useDrawerService } from './drawer.service';
import { useInjection } from '../di/inject';
import { useLogout } from '../../use-cases/auth/logoutUser';

export interface DrawerViewModel {
  logout: () => void;
  menuItem: DrawerMenuItem;
  setMenuItem(value: DrawerMenuItem): void;
}

export function useDrawerViewModel(): DrawerViewModel {
  const { logout } = useLogout(useInjection);
  const { menuItem, setMenuItem } = useDrawerService();
  return {
    logout,
    menuItem,
    setMenuItem,
  };
}
