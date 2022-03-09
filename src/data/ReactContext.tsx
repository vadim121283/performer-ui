import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React, { useState } from 'react';
import { useContext } from 'react';

const StoreContext = React.createContext<any>({});
export const useContextStore = () => useContext(StoreContext);

export const ContextProvider: React.FC = ({ children }) => {
  const [gqlClient, setGqlClient] =
    useState<ApolloClient<NormalizedCacheObject>>();

  const value = {
    gqlClient,
    setGqlClient,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
