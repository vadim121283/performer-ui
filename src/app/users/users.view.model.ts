import { User } from '../../common/domain/entity/User';
import { useUsersService } from './users.service';

export interface UsersViewModel {
  users: User[] | undefined;
}

export function useUsersViewModel(): UsersViewModel {
  const { users } = useUsersService();
  return {
    users,
  };
}
