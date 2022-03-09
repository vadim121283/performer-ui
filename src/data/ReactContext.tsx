import React, { useState } from 'react';
import { useContext } from 'react';

const StoreContext = React.createContext<any>({});
export const useContextStore = () => useContext(StoreContext);

export const ContextProvider: React.FC = ({ children }) => {
  const [sample, setSample] = useState<string>('');

  const value = {
    sample,
    setSample,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
