import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export function connectApolloClient(
  url: string,
  token: string
): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({ uri: `${url}` });

  const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    // const token = localStorage.getItem('token');

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
}
