import { useContext } from 'react';

import { DIContext, DIContainerType } from './DIContext';

export const useInjection = (): DIContainerType => {
  return useContext(DIContext) as DIContainerType;
};
