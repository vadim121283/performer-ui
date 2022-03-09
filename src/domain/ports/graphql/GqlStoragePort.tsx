import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export interface GqlStoragePort {
  gqlClient: ApolloClient<NormalizedCacheObject> | undefined;
  setGqlClient: (
    value: ApolloClient<NormalizedCacheObject> | undefined
  ) => void;
}
