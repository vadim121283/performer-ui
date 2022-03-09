import { GqlOperatePort } from '../../domain/ports/graphql/GqlOperatePort';
import { useApolloClient } from './useApolloClient';

export function useGqlOperate(): GqlOperatePort {
  const { connectApolloClient, send } = useApolloClient();

  function connectGql() {
    return connectApolloClient();
  }

  return {
    connectGql,
    sendGqlMessage(value) {
      return send(value);
    },
  };
}
