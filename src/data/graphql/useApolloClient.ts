import {
  ApolloClient,
  ApolloLink,
  ApolloQueryResult,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useLogger } from '../../utils/logger';
import { useAuthStorage } from '../auth/AuthStorage';
import { useInitStorage } from '../init/InitStorage';
import { useContextStore } from '../ReactContext';

export function useApolloClient() {
  const { debug } = useLogger('useApolloClient');
  const { config } = useInitStorage();
  const { gqlClient, setGqlClient } = useContextStore();
  const { user } = useAuthStorage();

  function connectApolloClient() {
    if (gqlClient) return true;
    const httpLink = new HttpLink({ uri: `${config.gqlUrl}` });

    const authLink = new ApolloLink((operation, forward) => {
      // Retrieve the authorization token from local storage.
      // const token = localStorage.getItem('token');

      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    setGqlClient(client);
    debug('START GQL client');
    return true;
  }

  async function send(
    msg: DocumentNode
  ): Promise<ApolloQueryResult<any> | undefined> {
    debug('SEND GQL: ', msg);
    if (gqlClient) {
      const client = gqlClient as ApolloClient<NormalizedCacheObject>;
      const response = await client.query({
        query: msg,
      });
      debug('RESPONSE GQL: ', response);
      return response;
    }
  }

  return {
    connectApolloClient,
    send,
  };
}
