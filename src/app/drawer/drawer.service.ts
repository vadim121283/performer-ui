import { useAppSelector, useAppDispatch } from '../redux/ReduxHooks';
import { DrawerMenuItem } from './DrawerMenuItem';
import { selectMenuItem, setMenuItem } from './drawer.slice';

export function useDrawerService() {
  const dispatch = useAppDispatch();
  const menuItem = useAppSelector(selectMenuItem);

  return {
    menuItem,
    setMenuItem(value: DrawerMenuItem) {
      return dispatch(setMenuItem(value));
    },
  };
}
