import React from 'react';
import { initDi } from '../data/init/initDi';
import { authDi } from '../data/auth/authDi';
import { gqlDi } from '../data/graphql/gqlDi';
import { useLogger } from '../utils/logger';

const Container = {
  ...initDi,
  ...authDi,
  ...gqlDi,
  useLogger,
};

export type DIContainerType = typeof Container;
export const DIContext =
  React.createContext<Partial<DIContainerType>>(Container);
