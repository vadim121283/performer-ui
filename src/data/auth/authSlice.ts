import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/ReactRedux';
import { User } from '../../domain/entity/auth/models/User';

interface InitState {
  isAuthorized: boolean;
  user?: User;
  authError?: AuthError;
}

const initialState: InitState = {
  isAuthorized: false,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setAuthError: (state, action: PayloadAction<AuthError | undefined>) => {
      state.authError = action.payload;
    },
  },
});

export const { setIsAuthorized, setUser, setAuthError } = slice.actions;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.authError;

export default slice.reducer;
