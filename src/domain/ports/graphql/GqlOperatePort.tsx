import { ApolloQueryResult, DocumentNode } from '@apollo/client';

export interface GqlOperatePort {
  // Start|Stop GraphQL service. return success
  connectGql: () => boolean;
  sendGqlMessage(
    value: DocumentNode
  ): Promise<ApolloQueryResult<any> | undefined>;
}
