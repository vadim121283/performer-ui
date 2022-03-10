import { User } from '../../../common/domain/entity/User';
import { useUsersGql } from '../../../data/users/UsersGql';

export interface UsersViewModel {
  users: User[] | undefined;
}

export function useUsersViewModel(): UsersViewModel {
  const { users } = useUsersGql();
  return {
    users,
  };
}
