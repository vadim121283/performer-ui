import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/ReactRedux';
import { DrawerMenuItem } from './DrawerMenuItem';

interface InitState {
  menuItem: DrawerMenuItem;
}

const initialState: InitState = {
  menuItem: DrawerMenuItem.dashboard,
};

export const slice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setMenuItem: (state, action: PayloadAction<DrawerMenuItem>) => {
      state.menuItem = action.payload;
    },
  },
});

export const { setMenuItem } = slice.actions;

export const selectMenuItem = (state: RootState) => state.drawer.menuItem;

export default slice.reducer;
