import { User } from '../../common/domain/entity/User';

export interface UsersPort {
  users: User[] | undefined;
  refetchUsers(): void;
}
