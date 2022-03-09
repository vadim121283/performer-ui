import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/ReactRedux';
import { Locale } from '../../domain/entity/init/models/Locales';
import { Config } from '../../domain/entity/init/models/Config';

interface InitState {
  isInitialized: boolean;
  config: Config;
  locale?: Locale;
}

const initialState: InitState = {
  isInitialized: false,
  config: {
    authUrl: '',
    apiUrl: '',
    gqlUrl: '',
  },
};

export const slice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setConfig: (state, action: PayloadAction<Config>) => {
      state.config = action.payload;
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const { setInitialized, setConfig, setLocale } = slice.actions;

export const selectIsInitialized = (state: RootState) =>
  state.init.isInitialized;
export const selectConfig = (state: RootState) => state.init.config;
export const selectLocale = (state: RootState) => state.init.locale;

export default slice.reducer;
