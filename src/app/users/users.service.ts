import { gql, useQuery } from '@apollo/client';
import { User } from '../../common/domain/entity/User';
import { UsersPort } from './users.port';

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

export function useUsersService(): UsersPort {
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
