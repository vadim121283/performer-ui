import { GqlStoragePort } from '../../domain/ports/graphql/GqlStoragePort';
import { useContextStore } from '../ReactContext';

export function useGqlStorage(): GqlStoragePort {
  const { gqlClient, setGqlClient } = useContextStore();
  return {
    gqlClient,
    setGqlClient,
  };
}
