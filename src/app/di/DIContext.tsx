import React from 'react';
import { initDi } from '../init/init.di';
import { authDi } from '../auth/auth.di';
import { useLogger } from '../../utils/logger';

const Container = {
  ...initDi,
  ...authDi,
  useLogger,
};

export type DIContainerType = typeof Container;
export const DIContext =
  React.createContext<Partial<DIContainerType>>(Container);
