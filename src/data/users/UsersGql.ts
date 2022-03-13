import { gql, useQuery } from '@apollo/client';
import { User } from '../../common/domain/entity/User';
import { UsersGqlPort } from '../../domain/ports/users/UsersGqlPort';

const QUERY_MSG = gql`
  query UsersQuery {
    users {
      guid
      login
      name
      surname
    }
  }
`;

export function useUsersGql(): UsersGqlPort {
  const { loading, error, data, refetch, networkStatus } =
    useQuery<{ users: User[] }>(QUERY_MSG);
  const users = data?.users;
  console.log('TT ', data);

  return {
    users,
    refetchUsers() {
      return refetch();
    },
  };
}
